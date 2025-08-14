import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[];

    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        message =
          ((response as Record<string, unknown>).message as string) ||
          exception.message;
      } else {
        message = exception.message;
      }
    } else {
      message =
        exception instanceof Error
          ? exception.message
          : 'Internal Server Error';
    }
    const responseBody = {
      statusCode: httpStatus,
      message: message,
      timestamp: new Date().toISOString(),
      path: <string>httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    Logger.error(`${httpStatus} ${message}`, 'AllExceptionsFilter');

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
