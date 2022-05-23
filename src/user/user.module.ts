import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers';
import { User, Event } from './entities';
import { UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
