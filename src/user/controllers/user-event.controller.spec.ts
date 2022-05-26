import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { UserEventController } from './user-event.controller';
import { EventService, UserService } from '../services';
import { eventDtoMock, eventMock, userMock } from '../mocks';

describe('UserEventController', () => {
  let controller: UserEventController;
  let eventService: EventService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserEventController],
      providers: [
        { provide: EventService, useValue: createMock() },
        { provide: UserService, useValue: createMock() },
      ],
    }).compile();

    controller = module.get(UserEventController);
    eventService = module.get(EventService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(eventService).toBeDefined();
  });

  describe('create', () => {
    it('resolves', async () => {
      const user = userMock();
      const event = eventMock();
      const eventDto = eventDtoMock();

      jest.spyOn(eventService, 'create').mockResolvedValue(event);
      jest.spyOn(eventService, 'toDto').mockReturnValue(eventDto);

      await expect(controller.create(user, eventDto)).resolves.toEqual(
        eventDto,
      );

      expect(eventService.create).toHaveBeenCalledWith(user, eventDto);
      expect(eventService.create).toHaveBeenCalledTimes(1);
    });
  });
});
