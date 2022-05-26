import { Test } from '@nestjs/testing';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { configMock } from './config.schema.mock';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  const defaultProcessEnv = process.env;

  beforeEach(async () => {
    Object.assign(process.env, {
      ...process.env,
      ...configMock,
    });

    jest.spyOn(dotenv, 'config').mockReturnValue({
      parsed: configMock as unknown as dotenv.DotenvParseOutput,
    });

    const module = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get(ConfigService);
  });

  afterEach(async () => {
    jest.clearAllMocks();

    Object.assign(process.env, defaultProcessEnv);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateSchema', () => {
    it('should validate schema', () => {
      jest.spyOn(process, 'exit').mockImplementation();
      jest.spyOn(service['logger'], 'error').mockImplementation();

      expect(service.validateSchema(configMock)).toBeDefined();

      expect(service['logger']['error']).not.toBeCalled();
      expect(process.exit).not.toBeCalled();
    });

    it('should validate schema and exit if errors', () => {
      jest.spyOn(process, 'exit').mockImplementation();
      jest.spyOn(service['logger'], 'error').mockImplementation();

      expect(service.validateSchema({ PORT: 0 })).toBeDefined();

      expect(service['logger']['error']).toBeCalled();
      expect(process.exit).toBeCalledWith(1);
      expect(process.exit).toBeCalledTimes(1);
    });
  });

  describe('get port', () => {
    it('should return values', () => {
      expect(service.port).toBe(configMock.PORT);
    });
  });

  describe('get psql', () => {
    it('should return values', () => {
      expect(service.psql).toEqual({
        type: 'postgres',
        host: configMock.POSTGRES_HOST,
        port: configMock.POSTGRES_PORT,
        username: configMock.POSTGRES_USER,
        password: configMock.POSTGRES_PASSWORD,
        database: configMock.POSTGRES_DB,
        entities: JSON.parse(configMock.POSTGRES_ENTITIES),
        synchronize: configMock.POSTGRES_SYNCHRONIZE,
        logging: configMock.POSTGRES_LOGGING,
        keepConnectionAlive: true,
      });
    });
  });
});
