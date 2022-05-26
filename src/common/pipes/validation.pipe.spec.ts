import { UnprocessableEntityException } from '@nestjs/common';

import { exceptionFactory } from './validation.pipe';

describe('ValidationPipe', () => {
  describe('exceptionFactory', () => {
    const errors = [
      {
        target: { email: 'heyemail.com' },
        value: 'heyemail.com',
        property: 'email',
        children: [],
        constraints: { isEmail: 'email must be an email' },
      },
    ];
    it('should not throw if error array is empty', () => {
      expect(exceptionFactory([])).toBeUndefined();
    });

    it('should throw UnprocessableEntityException', () => {
      const fn = () => exceptionFactory(errors);
      expect(fn).toThrow(UnprocessableEntityException);
      expect(fn).toThrow('email must be an email');
    });
  });
});
