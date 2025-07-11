import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente disponíveis em todos os módulos
      envFilePath: '.env', // Especifica o caminho do arquivo .env
    }),
    PrismaModule, // Importe o PrismaModule PRIMEIRO
    UserModule, AuthModule, ProductsModule, CartModule, CartItemModule,    // Depois os módulos que dependem do banco
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}