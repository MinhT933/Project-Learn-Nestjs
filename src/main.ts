import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // app.setGlobalPrefix('v1');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    // .addBearerAuth()
    .addCookieAuth('optional-session-id')
    .setTitle('book example')
    .setDescription('The information API description')
    .setVersion('1.0')
    .addTag('book')
    .build();

  // const configService = app.get(ConfigService);
  // const environment = configService.get<string>('NODE_ENV');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger/api', app, document);
  // if (environment !== 'production') {
  // }

  await app.listen(process.env.PORT);

  console.log(`Application running at ${process.env.PORT}`);
}
bootstrap();
