import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => 
      new UnprocessableEntityException('Dados Inválidos'),
  }));
  await app.listen(3000);
}
bootstrap();
