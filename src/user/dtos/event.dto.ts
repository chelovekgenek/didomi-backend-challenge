import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

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
  id: NotificationType;

  @Expose()
  @ApiProperty({ example: false })
  enabled: boolean;
}
