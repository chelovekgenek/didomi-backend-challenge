import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsEnum } from 'class-validator';

export enum NotificationType {
  EMAIL = 'email_notifications',
  SMS = 'sms_notifications',
}

export class EventDto {
  @Expose()
  @ApiProperty({
    enum: NotificationType,
    example: NotificationType.EMAIL,
  })
  @IsEnum(NotificationType)
  id: NotificationType;

  @Expose()
  @ApiProperty({ example: false })
  @IsBoolean()
  enabled: boolean;
}
