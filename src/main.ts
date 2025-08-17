import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';
import { UnauthorizedExceptionFilter } from './exception-filters/unauthorized-http-exception.filter';
import { PrismaClientExceptionFilter } from './exception-filters/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost));

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
