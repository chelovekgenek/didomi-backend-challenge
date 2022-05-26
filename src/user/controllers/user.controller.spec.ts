import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { UserService } from '../services';
import { userDtoMock, userMock } from '../mocks';
import { UserController } from './user.controller';

describe('UserService', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: createMock() }],
    }).compile();

    controller = module.get(UserController);
    userService = module.get(UserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('getAll', () => {
    it('resolves', async () => {
      const user = userMock();
      const userDto = userDtoMock();

      jest.spyOn(userService, 'getAll').mockResolvedValue([user]);
      jest.spyOn(userService, 'toDto').mockReturnValue(userDto);

      await expect(controller.getAll()).resolves.toEqual([userDto]);

      expect(userService.getAll).toHaveBeenCalledWith();
      expect(userService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('resolves', async () => {
      const user = userMock();
      const userDto = userDtoMock();

      jest.spyOn(userService, 'toDto').mockReturnValue(userDto);

      await expect(controller.getById(user)).resolves.toEqual(userDto);
    });
  });

  describe('create', () => {
    it('resolves', async () => {
      const user = userMock();
      const userDto = userDtoMock();

      jest.spyOn(userService, 'create').mockResolvedValue(user);
      jest.spyOn(userService, 'toDto').mockReturnValue(userDto);

      await expect(controller.create(userDto)).resolves.toEqual(userDto);

      expect(userService.create).toHaveBeenCalledWith(userDto);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });
  });
});
