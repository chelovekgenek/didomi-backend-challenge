import { ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';

import { UserService } from '../services';
import { UserByIdPipe } from './user-by-id.pipe';
import { userMock } from '../mocks';

describe('UserByIdPipe', () => {
  let pipe: UserByIdPipe;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserByIdPipe,
        { provide: UserService, useValue: createMock() },
      ],
    }).compile();

    pipe = module.get(UserByIdPipe);
    userService = module.get(UserService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('transform', () => {
    const metadata: ArgumentMetadata = { type: 'param' };
    it('should throw an error if param is not a valid uuid', async () => {
      const fn = () => pipe.transform({ id: 'uuid' }, metadata);

      jest.spyOn(userService, 'getById').mockImplementation();

      await expect(fn).rejects.toThrowError(UnprocessableEntityException);
      await expect(fn).rejects.toThrowError('id must be a UUID');

      expect(userService.getById).toHaveBeenCalledTimes(0);
    });

    it('should resolves with user entity', async () => {
      const user = userMock();

      jest.spyOn(userService, 'getById').mockResolvedValue(user);

      await expect(pipe.transform({ id: user.id }, metadata)).resolves.toEqual(
        user,
      );

      expect(userService.getById).toBeCalledWith(user.id);
      expect(userService.getById).toBeCalledTimes(1);
    });
  });
});
