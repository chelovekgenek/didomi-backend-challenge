import {
  IsEnum,
  IsInt,
  IsString,
  IsBoolean,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

import { ToNumber, ToBoolean } from '../common/decorators';
import { NodeEnv, PostgresLogging } from './config.types';

export class ConfigSchema {
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv = NodeEnv.DEVELOPMENT;

  @ToNumber()
  @IsInt()
  @IsPositive()
  PORT = 8080;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST = '127.0.0.1';

  @ToNumber()
  @IsInt()
  @IsPositive()
  POSTGRES_PORT = 5432;

  @IsString()
  POSTGRES_USER = 'postgres';

  @IsString()
  POSTGRES_PASSWORD = 'root';

  @IsString()
  POSTGRES_DB = 'didomi';

  @ToBoolean()
  @IsBoolean()
  POSTGRES_SYNCHRONIZE = true;

  @IsEnum(PostgresLogging)
  POSTGRES_LOGGING: PostgresLogging = PostgresLogging.ERROR;

  @IsString()
  @IsNotEmpty()
  POSTGRES_ENTITIES = '["dist/**/*.entity.js"]';
}
