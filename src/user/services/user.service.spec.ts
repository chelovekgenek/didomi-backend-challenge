import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { EventService } from '../services';
import { User } from '../entities';
import { UserService } from './user.service';
import { eventDtoMock, eventMock, userDtoMock, userMock } from '../mocks';

describe('UserService', () => {
  let service: UserService;
  let eventService: EventService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: EventService, useValue: createMock() },
        { provide: getRepositoryToken(User), useValue: createMock() },
      ],
    }).compile();

    service = module.get(UserService);
    eventService = module.get(EventService);
    userRepository = module.get(getRepositoryToken(User));
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(eventService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('resolves', async () => {
      const user = userMock();

      jest.spyOn(userRepository, 'find').mockResolvedValue([user]);

      await expect(service.getAll()).resolves.toEqual([user]);

      expect(userRepository.find).toHaveBeenCalledWith();
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('resolves', async () => {
      const user = userMock();

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      await expect(service.getById(user.id)).resolves.toEqual(user);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
      });
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('rejects when user not found', async () => {
      const user = userMock();

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

      await expect(service.getById(user.id)).rejects.toThrow(NotFoundException);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: user.id },
      });
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('resolves', async () => {
      const user = userMock();
      const userDto = userDtoMock();

      jest.spyOn(userRepository, 'save').mockResolvedValue(user);
      jest.spyOn(service, 'getById').mockResolvedValue(user);

      await expect(service.create(userDto)).resolves.toEqual(user);

      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(service.getById).toHaveBeenCalledWith(user.id);
      expect(service.getById).toHaveBeenCalledTimes(1);
    });

    it('rejects with UnprocessableEntityException if email address already registered', async () => {
      const user = userMock();
      const userDto = userDtoMock();

      jest.spyOn(userRepository, 'save').mockRejectedValue({ code: '23505' });
      jest.spyOn(service, 'getById').mockResolvedValue(null);

      await expect(service.create(userDto)).rejects.toThrowError(
        UnprocessableEntityException,
      );

      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(service.getById).toHaveBeenCalledTimes(0);
    });

    it('rejects and rethrow  if email address already registered', async () => {
      const user = userMock();
      const userDto = userDtoMock();

      jest.spyOn(userRepository, 'save').mockRejectedValue(new Error('any'));
      jest.spyOn(service, 'getById').mockResolvedValue(null);
      jest.spyOn(service['logger'], 'error').mockImplementation();

      await expect(service.create(userDto)).rejects.toThrowError(Error);

      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(service.getById).toHaveBeenCalledTimes(0);
      expect(service['logger']['error']).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('resolves', async () => {
      const user = userMock();

      jest.spyOn(userRepository, 'delete').mockResolvedValue(void 0);

      await expect(service.delete(user)).resolves.toBeUndefined();

      expect(userRepository.delete).toHaveBeenCalledWith(user.id);
      expect(userRepository.delete).toHaveBeenCalledTimes(1);
    });
  });

  describe('toDto', () => {
    it('resolves', () => {
      const event1 = eventMock({ id: '1' });
      const event2 = eventMock({ id: '2' });
      const user = userMock({ consents: [event1, event2] });

      const eventDto = eventDtoMock();
      const userDto = userDtoMock({ consents: [eventDto, eventDto] });

      jest.spyOn(eventService, 'toDto').mockReturnValue(eventDto);

      const res = service.toDto(user);

      expect(res).toEqual(userDto);
      expect(eventService.toDto).toHaveBeenCalledWith(event1);
      expect(eventService.toDto).toHaveBeenCalledWith(event2);
      expect(eventService.toDto).toHaveBeenCalledTimes(2);
    });
  });
});
