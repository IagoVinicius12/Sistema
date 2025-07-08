import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

const prisma=new PrismaClient()

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {

    const product=createProductDto

    try{
      const verification= await prisma.product.findUnique(product.name)

      if(verification){
        throw new ConflictException('Produto já cadastrado')
      }

      const cadastro_produto= await prisma.product.create({
        data:{
        name: product.name,
        price:product.price,
        quantity:product.quantity
      }
      })
      return cadastro_produto
    }
    catch(error){
      return error
    }
  }

  async findAll() {
    return await prisma.product.findMany();
  }

  async findOne(id: number) {
    return await prisma.product.findUnique({where:{id:id}})
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{

      const product= await prisma.product.findUnique(id)

      if(!product){
        throw new NotFoundException('Não existe o produto procurado')
      }

      const updated_product={
        name:product.name,
        price:product.price|| updateProductDto.price,
        quantity:product.quantity || updateProductDto.quantity
      }

      await prisma.product.update(updated_product)

    }catch(error){
      return error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
