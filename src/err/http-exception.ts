import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const msg = exception.getResponse();
    console.log('http exception callk');
    //console.log('response=',response)
    //console.log('request=',request)
    //console.log('status=',status)
    response.status(status).json({
      statusCode: status,
      message: msg,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
