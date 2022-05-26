import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { EventService } from '../services';
import { eventDtoMock, eventMock, userMock } from '../mocks';
import { Event } from '../entities';
import { EventDto } from '../dtos';

describe('EventService', () => {
  let service: EventService;
  let eventRepository: Repository<Event>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EventService,
        { provide: getRepositoryToken(Event), useValue: createMock() },
      ],
    }).compile();

    service = module.get(EventService);
    eventRepository = module.get(getRepositoryToken(Event));
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(eventRepository).toBeDefined();
  });

  describe('getAllByUser', () => {
    it('resolves', async () => {
      const user = userMock();
      const event = eventMock();

      jest.spyOn(eventRepository, 'find').mockResolvedValue([event]);

      await expect(service.getAllByUser(user)).resolves.toEqual([event]);

      expect(eventRepository.find).toHaveBeenCalledWith({ where: { user } });
      expect(eventRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('resolves', async () => {
      const user = userMock();
      const eventDto = eventDtoMock();
      const event = eventMock({
        user,
        type: eventDto.id,
        enabled: eventDto.enabled,
      });

      jest.spyOn(eventRepository, 'save').mockResolvedValue(event);

      await expect(service.create(user, eventDto)).resolves.toEqual(event);

      expect(eventRepository.save).toHaveBeenCalledWith({ where: { user } });
      expect(eventRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('toDto', () => {
    it('resolves', () => {
      const event = eventMock();
      const eventDto = eventDtoMock({ id: event.type, enabled: event.enabled });
      const res = service.toDto(event);

      expect(res).toEqual(eventDto);
      expect(res).toBeInstanceOf(EventDto);
    });
  });
});
