import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { ValidationPipe } from '../../common/pipes';
import { EventDto } from '../dtos';
import { User } from '../entities';
import { UserByIdPipe } from '../pipes';
import { EventService } from '../services';

@Controller('/api/users')
export class UserEventController {
  constructor(private readonly eventService: EventService) {}

  @Post(':id/events')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user event' })
  @ApiResponse({ status: HttpStatus.CREATED, type: EventDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Validation error',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async create(
    @Param(UserByIdPipe) user: User,
    @Body(ValidationPipe) dto: EventDto,
  ): Promise<EventDto> {
    const event = await this.eventService.create(user, dto);
    return this.eventService.toDto(event);
  }
}
