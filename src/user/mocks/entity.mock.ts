import { makeDtoMockFactory } from '../../common/utils';
import { NotificationType } from '../dtos';
import { Event, User } from '../entities';

export const userMock = makeDtoMockFactory(User, {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'valid@email.com',
  consents: [],
  createdAt: new Date('2020-01-01T00:00:00.000Z'),
});

export const eventMock = makeDtoMockFactory(Event, {
  id: '00000000-0000-0000-0000-000000000000',
  type: NotificationType.EMAIL,
  enabled: true,
  createdAt: new Date('2020-01-01T00:00:00.000Z'),
});
