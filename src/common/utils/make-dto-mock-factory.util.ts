import { Type } from '@nestjs/common';

export function makeDtoMockFactory<
  T extends unknown,
  K extends keyof T,
  V extends T[K],
>(classRef: Type<T>, defaults: Partial<T> = {}): (overrides?: Partial<T>) => T {
  return (overrides: Partial<T> = {}): T => {
    const obj = Object.create(classRef.prototype) as T;

    Object.assign(obj, defaults);

    Object.keys(overrides)
      .filter((key) => obj.hasOwnProperty(key))
      .forEach((key) => {
        obj[key as K] = overrides[key as K] as V;
      });

    return obj;
  };
}
