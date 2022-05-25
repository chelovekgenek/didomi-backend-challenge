import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';

export const ValidationPipe = new NestValidationPipe({
  transform: true,
  whitelist: true,
  exceptionFactory: (errors: ValidationError[]) => {
    let error = errors[0];
    while (error.children && error.children.length) {
      error = error.children[0];
    }
    const errorMessage = error.constraints[Object.keys(error.constraints)[0]];
    throw new UnprocessableEntityException(errorMessage);
  },
});
