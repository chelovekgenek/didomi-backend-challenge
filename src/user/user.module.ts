import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController, UserEventController } from './controllers';
import { User, Event } from './entities';
import { EventService, UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event])],
  controllers: [UserController, UserEventController],
  providers: [UserService, EventService],
})
export class UserModule {}
