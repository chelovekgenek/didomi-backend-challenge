import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { ValidationPipe } from '../../common/pipes';
import { UserDto } from '../dtos';
import { User } from '../entities';
import { UserByIdPipe } from '../pipes';
import { UserService } from '../services';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponse({ type: [UserDto] })
  async getAll(): Promise<UserDto[]> {
    const users = await this.userService.getAll();
    return users.map((user) => this.userService.toDto(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an existing user by id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiParam({ name: 'id' })
  async getById(@Param(UserByIdPipe) user: User): Promise<UserDto> {
    return this.userService.toDto(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDto })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Validation error',
  })
  async create(@Body(ValidationPipe) dto: UserDto): Promise<UserDto> {
    const user = await this.userService.create(dto);
    return this.userService.toDto(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an existing user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiParam({ name: 'id' })
  async delete(@Param(UserByIdPipe) user: User): Promise<void> {
    await this.userService.delete(user);
  }
}
