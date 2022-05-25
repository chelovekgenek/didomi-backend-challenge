import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { IsUUID } from 'class-validator';

import { ValidationPipe } from '../../common/pipes';
import { User } from '../entities';
import { UserService } from '../services';

class ParamsDto {
  @IsUUID()
  id: string;
}

@Injectable()
export class UserByIdPipe implements PipeTransform<ParamsDto, Promise<User>> {
  constructor(private readonly userService: UserService) {}
  async transform(
    params: ParamsDto,
    metadata: ArgumentMetadata,
  ): Promise<User> {
    await ValidationPipe.transform(params, {
      ...metadata,
      metatype: ParamsDto,
    });

    return this.userService.getById(params.id);
  }
}
