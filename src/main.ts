import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.mpdule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
