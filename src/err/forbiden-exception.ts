import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
      super('nonauthority', HttpStatus.NON_AUTHORITATIVE_INFORMATION);
    }
  }