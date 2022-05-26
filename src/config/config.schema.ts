import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsString,
  IsBoolean,
  IsPositive,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

import { ToNumber, ToBoolean } from '../common/decorators';
import { NodeEnv, PostgresLogging } from './config.types';

export class ConfigSchema {
  @Expose()
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv = NodeEnv.DEVELOPMENT;

  @Expose()
  @ToNumber()
  @IsInt()
  @IsPositive()
  PORT = 8080;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @Expose()
  @ToNumber()
  @IsInt()
  @IsPositive()
  POSTGRES_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @Expose()
  @IsString()
  @IsOptional()
  POSTGRES_PASSWORD: string;

  @Expose()
  @IsString()
  POSTGRES_DB: string;

  @Expose()
  @ToBoolean()
  @IsBoolean()
  POSTGRES_SYNCHRONIZE = false;

  @Expose()
  @IsEnum(PostgresLogging)
  POSTGRES_LOGGING: PostgresLogging = PostgresLogging.ERROR;

  @Expose()
  @IsString()
  @IsNotEmpty()
  POSTGRES_ENTITIES = '["dist/**/*.entity.js"]';
}
