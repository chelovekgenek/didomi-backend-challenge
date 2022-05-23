import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { UserDto } from '../dtos';
import { User } from '../entities';
import { UserService } from '../services';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "Get user's list" })
  @ApiResponse({ type: [UserDto] })
  async getAll(): Promise<UserDto[]> {
    const users = await this.userService.getAll();
    return users.map(this.toDto);
  }

  private toDto(user: User): UserDto {
    return plainToClass(UserDto, user);
  }
}
