import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';

export class UpdateCartDto extends PartialType(CreateCartDto) {
    cartId:number
    productId:number
    quantity:number
}
