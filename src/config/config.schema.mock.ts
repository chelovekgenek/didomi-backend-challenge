import { NodeEnv, PostgresLogging } from './config.types';
import { ConfigSchema } from './config.schema';

export const configMock: ConfigSchema = {
  NODE_ENV: NodeEnv.DEVELOPMENT,
  PORT: 8080,
  POSTGRES_HOST: 'psql',
  POSTGRES_PORT: 5432,
  POSTGRES_USER: 'postgres',
  POSTGRES_PASSWORD: 'root',
  POSTGRES_DB: 'db_name',
  POSTGRES_SYNCHRONIZE: false,
  POSTGRES_LOGGING: PostgresLogging.ERROR,
  POSTGRES_ENTITIES: '["dist/**/*.entity.js"]',
};
