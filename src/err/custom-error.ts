import { HttpStatus } from '@nestjs/common';

export function applicationError(
  code: HttpStatus,
  customMessage?: string,
): Promise<Error> {
  const error = new ErrorResult();
  error.code = code;
  if (customMessage) {
    error.message = customMessage;
  }
  throw error;
}

export class ErrorResult extends Error {
  code: HttpStatus;
  messages?: string[];
}
