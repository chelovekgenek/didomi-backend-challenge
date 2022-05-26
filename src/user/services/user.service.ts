import {
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { UserDto } from '../dtos';
import { User } from '../entities';
import { EventService } from './event.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly eventService: EventService,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async create(dto: Pick<UserDto, 'email'>): Promise<User> {
    const entity = this.userRepository.create(dto);

    try {
      const user = await this.userRepository.save(entity);
      return this.getById(user.id);
    } catch (e) {
      if (e?.code === '23505') {
        throw new UnprocessableEntityException();
      } else {
        this.logger.error(e);
        throw e;
      }
    }
  }

  async delete(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
  }

  toDto(user: User): UserDto {
    return plainToClass(
      UserDto,
      {
        ...user,
        consents: user.consents.map((consent) =>
          this.eventService.toDto(consent),
        ),
      },
      { excludeExtraneousValues: true },
    );
  }
}
