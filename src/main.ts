import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'somesecret',
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 3600000}
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Applet API')
    .setDescription('APPLET API desc')
    .setVersion('1.0')
    .addTag('applet')
    .addBasicAuth()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
