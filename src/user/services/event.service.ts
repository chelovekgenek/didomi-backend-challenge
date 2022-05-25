import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { EventDto } from '../dtos';
import { Event, User } from '../entities';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getAllByUser(user: User): Promise<Event[]> {
    return this.eventRepository.find({ where: { user } });
  }

  async create(user: User, dto: EventDto): Promise<Event> {
    const entity = this.eventRepository.create({
      user,
      type: dto.id,
      enabled: dto.enabled,
    });

    return this.eventRepository.save(entity);
  }

  toDto(event: Event): EventDto {
    return plainToClass(
      EventDto,
      { id: event.type, enabled: event.enabled },
      { excludeExtraneousValues: true },
    );
  }
}
