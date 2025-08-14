import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - startTime;
        Logger.log(
          `${request.method} ${request.url} ${response.statusCode} - ${responseTime} ms`,
          'HTTP',
        );
      }),
    );
  }
}
