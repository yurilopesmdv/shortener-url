// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // << IMPORTANTE

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('API para encurtar e gerenciar URLs, com autenticação JWT.')
    .setVersion('1.0')
    .addTag('urls', 'Operações de encurtamento e gerenciamento de URLs')
    .addTag('auth', 'Autenticação de usuários')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entre com o token JWT para acessar as rotas protegidas.',
        in: 'header',
      },
      'access-token',
    )
    .addServer(
      process.env.BASE_URL || 'http://localhost:3000',
      'Ambiente de Desenvolvimento Local',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}
void bootstrap();
