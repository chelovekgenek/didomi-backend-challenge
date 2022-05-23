import { Logger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(NestApplication.name);

  const configService = app.get(ConfigService);

  await app.listen(configService.port, () => {
    logger.log(`Running on: http://localhost:${configService.port}`);
  });
}
bootstrap();
