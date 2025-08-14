import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 401;
    let resMessage = exception.message;
    if (resMessage === 'Unauthorized' || !resMessage) {
      resMessage = 'Unauthorized: Token is missing, invalid, or expired';
    }

    response.status(status).json({
      statusCode: status,
      message: resMessage,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest<Request>().url,
    });

    const request = ctx.getRequest<Request>();
    Logger.error(
      `Unauthorized access attempt: ${resMessage}`,
      `UnauthorizedExceptionFilter - ${request.method} ${request.url}`,
    );
  }
}
