import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserService } from 'src/user/user.service';
import { CartItemService } from 'src/cart-item/cart-item.service';

@Module({
  controllers: [CartController],
  providers: [CartService,UserService,CartItemService],
})
export class CartModule {}
