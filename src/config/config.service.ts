import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { LoggerOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as fs from 'fs';

import { ConfigSchema } from './config.schema';

export class ConfigService {
  private readonly schema: ConfigSchema;
  private readonly logger = new Logger(ConfigService.name);

  constructor() {
    this.schema = this.initSchema();
  }

  initSchema(): ConfigSchema {
    let config: Partial<ConfigSchema> = process.env as Record<string, string>;
    const path = join(process.cwd(), '.env');
    if (fs.existsSync(path)) {
      const { parsed } = dotenv.config({
        path,
        debug: process.env.DOT_DEBUG?.toLowerCase() === 'true',
      });
      config = Object.assign(config, parsed);
    }

    return this.validateSchema(config);
  }

  validateSchema(schema: Partial<ConfigSchema>): ConfigSchema {
    const classObj = plainToClass(ConfigSchema, schema, {
      exposeDefaultValues: true,
      excludeExtraneousValues: true,
    });
    const errors = validateSync(classObj);
    if (errors.length) {
      this.logger.error('Errors during config validation:');
      errors
        .map((err) => Object.values(err.constraints || {}).join(','))
        .forEach((err) => this.logger.error(err));

      process.exit(1);
    }
    return classObj;
  }

  get port(): number {
    return this.schema.PORT;
  }

  get psql(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.schema.POSTGRES_HOST,
      port: this.schema.POSTGRES_PORT,
      username: this.schema.POSTGRES_USER,
      password: this.schema.POSTGRES_PASSWORD,
      database: this.schema.POSTGRES_DB,
      entities: JSON.parse(this.schema.POSTGRES_ENTITIES),
      synchronize: this.schema.POSTGRES_SYNCHRONIZE,
      logging: this.schema.POSTGRES_LOGGING as LoggerOptions,
      keepConnectionAlive: true,
    };
  }
}
