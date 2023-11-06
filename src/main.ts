import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.mpdule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
