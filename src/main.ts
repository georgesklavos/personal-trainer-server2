import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Users } from './entities/users.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Personal trainer')
    .setDescription('Api documentation for the personal trainer project')
    .setVersion('1.0')
    .addTag('Athentication', 'Api for the login and signup to the platform')
    .addTag('Admin', 'Apis for the admin role')
    .addTag('Owner', 'Apis  for the owner role')
    .addTag('Client', 'Apis for the client role')
    .addTag('Trainer', 'Apis for the trainer role')
    .addTag('Support', 'Apis for the support role')
    .addTag('Owner-Trainer', 'Apis for the roles owner and trainer')
    .addTag('Mutual', 'Apis for all the roles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
