import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from './config';
import { UserModule } from './user';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.psql,
    }),
    ConfigModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
