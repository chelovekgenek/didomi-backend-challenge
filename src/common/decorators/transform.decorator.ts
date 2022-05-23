import { Transform } from 'class-transformer';

export const ToNumber = () => Transform(({ value }) => Number(value));

export const ToBoolean = () =>
  Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }

    return false;
  });
