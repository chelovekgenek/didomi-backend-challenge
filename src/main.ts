import {
  Logger,
  ValidationError,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { ConfigService } from './config';

const packageJson = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json')).toString(),
);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(NestApplication.name);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        let error = errors[0];
        while (error.children && error.children.length) {
          error = error.children[0];
        }
        const errorMessage =
          error.constraints[Object.keys(error.constraints)[0]];
        throw new UnprocessableEntityException(errorMessage);
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The service API description')
    .setVersion(packageJson.version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.use('/swagger.json', (req, res) => res.json(document));
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.port, () => {
    logger.log(`Running on: http://localhost:${configService.port}`);
    logger.log(`Read docs on: http://localhost:${configService.port}/docs`);
  });
}
bootstrap();
