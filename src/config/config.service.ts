import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
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
    let config: Partial<ConfigSchema> = {};
    const path = join(process.cwd(), '.env');
    if (fs.existsSync(path)) {
      const { parsed } = dotenv.config({
        path,
        debug: process.env.DOT_DEBUG?.toLowerCase() === 'true',
      });
      config = parsed;
    }

    this.schema = this.validateInput(config);
  }

  private validateInput(schema: Partial<ConfigSchema>): ConfigSchema {
    const classObj = plainToClass(ConfigSchema, schema);
    const errors = validateSync(classObj);
    if (errors.length) {
      this.logger.error('Config validation error!');
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
