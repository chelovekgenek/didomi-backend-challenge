import { makeDtoMockFactory } from './make-dto-mock-factory.util';

class SomeClass {
  prop?: string;
}

describe('makeDtoMockFactory', () => {
  it('should create a mock factory', () => {
    const mockFactory = makeDtoMockFactory(SomeClass, { prop: 'test' });

    const result = mockFactory();

    expect(mockFactory).toBeInstanceOf(Function);
    expect(result).toBeInstanceOf(SomeClass);
    expect(result.prop).toBe('test');
  });

  it('should override property', () => {
    const mockFactory = makeDtoMockFactory(SomeClass, { prop: 'test' });

    const result = mockFactory({ prop: 'updated' }).prop;

    expect(result).toBe('updated');
  });
});
