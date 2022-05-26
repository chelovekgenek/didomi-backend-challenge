import { plainToClass } from 'class-transformer';

import { ToNumber, ToBoolean } from './transform.decorator';

describe('transform.decorator', () => {
  describe('ToNumber', () => {
    class Dto {
      @ToNumber()
      value: number;
    }
    it('should transform to number', () => {
      expect(plainToClass(Dto, { value: '0' })).toEqual({ value: 0 });
    });
    it('should transform to NaN if input is not a number', () => {
      expect(plainToClass(Dto, { value: ['b'] })).toEqual({ value: NaN });
    });
  });

  describe('ToBoolean', () => {
    class Dto {
      @ToBoolean()
      value: boolean;
    }
    it('should transform to boolean', () => {
      expect(plainToClass(Dto, { value: 'true' })).toEqual({ value: true });
    });
    it('should lowercase and transform to boolean', () => {
      expect(plainToClass(Dto, { value: 'True' })).toEqual({ value: true });
    });
    it('should transform to boolean event if input is not valid', () => {
      expect(plainToClass(Dto, { value: ['b'] })).toEqual({ value: false });
    });
  });
});
