import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api-v1');
  app.enableCors({
    origin: ['http://localhost:3000', 'http://35.216.62.75:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.use(cookieParser());

  app.useWebSocketAdapter(new IoAdapter(app));

  swaggerConfig(app);

  await app.listen(8080);
}
bootstrap();
