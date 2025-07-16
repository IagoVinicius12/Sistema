import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração CORS para desenvolvimento (liberado para todas as origens)
  app.enableCors({
    origin: '*', // Permite qualquer frontend (APENAS EM DEV)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true, // Remova ou comente se não usar cookies/tokens
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 Servidor rodando na porta ${process.env.PORT ?? 3000}`);
}
bootstrap();