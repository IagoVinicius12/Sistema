import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient()

@Injectable()
export class CartService {
  async create(createCartDto: CreateCartDto) {

    try{
      const user=await prisma.user.findUnique({where:{id:createCartDto.userId}})
      if(!user){
        throw new NotFoundException('Usuário não encontrado')
      }
      const carrinho= await prisma.cart.create(
        {
          data:{
            userId: createCartDto.userId,
          }
        }
      )
      return carrinho
    }
    catch(error){
      throw new InternalServerErrorException('Erro interno do servidor')
    }
  }


  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {

    try{
      const carrinho= await prisma.cart.update({
        where:{id:updateCartDto.cartId},
        cartItems:{
          create:{
            productId:updateCartDto.productId,
            quantity:updateCartDto.quantity
          }
        }
      })
      if(!carrinho){
        throw new NotFoundException('Ocorreu um erro!')
      }
      return carrinho
    }
    catch(error){
      return error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
