import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEmail } from 'class-validator';

import { EventDto } from './event.dto';

export class UserDto {
  @Expose()
  @ApiProperty({
    example: '00000000-0000-0000-0000-000000000000',
    readOnly: true,
  })
  id: string;

  @Expose()
  @ApiProperty({ example: 'valid@email.com' })
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty({ type: [EventDto], readOnly: true })
  @Type(() => EventDto)
  consents: EventDto[];
}
