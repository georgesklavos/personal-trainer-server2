import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorException extends HttpException {
  constructor() {
    super('An error occured', HttpStatus.BAD_REQUEST);
  }
}

export class customErrorMessage extends HttpException {
  constructor(error: string, status: HttpStatus) {
    super(error, status);
  }
}
