import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/all-exceptions.filter';
import { UnauthorizedExceptionFilter } from './exception-filters/unauthorized-http-exception.filter';
import { PrismaClientExceptionFilter } from './exception-filters/prisma-client-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapterHost));

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Bookshelf API')
    .setDescription('Book management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
