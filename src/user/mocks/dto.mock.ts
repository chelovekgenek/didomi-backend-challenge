import { makeDtoMockFactory } from '../../common/utils';
import { EventDto, NotificationType, UserDto } from '../dtos';

export const userDtoMock = makeDtoMockFactory(UserDto, {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'valid@email.com',
  consents: [],
});

export const eventDtoMock = makeDtoMockFactory(EventDto, {
  id: NotificationType.EMAIL,
  enabled: false,
});
