import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {

    const product = createProductDto
    console.log(product)

      const verification = await prisma.product.findFirst({where:{name:product.name}})

      if (verification) {
        throw new ConflictException('Produto já cadastrado')
      }
      const cadastro_produto = await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          quantity: product.quantity
        }
      })

      return cadastro_produto
  }

  async findAll() {
    try{
      return await prisma.product.findMany();
    }
    catch(error){
      throw new InternalServerErrorException('Erro interno de servidor!')
    }
  }

  async findOne(id: number) {
    try{
      const produto=await prisma.product.findUnique({ where: { id: id } })
      if(!produto){
        throw new NotFoundException('Produto não encontrado')
      }
      return produto
    }
    catch(error){
      throw new InternalServerErrorException('Erro interno de servidor!')
    } 
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {

      const product = await prisma.product.findUnique({ where: { id: id } })

      if (!product) {
        throw new NotFoundException('Não existe o produto procurado')
      }

      const updated_product = {
        name: product.name,
        price: product.price || updateProductDto.price,
        quantity: product.quantity || updateProductDto.quantity
      }

      await prisma.product.update({
        where: { id: id },
        data: {
          name: updateProductDto.name || product.name,
          price: updateProductDto.price ?? product.price,
          quantity: updateProductDto.quantity ?? product.quantity,
        },
      })

    } catch (error) {
      return error
    }
  }

  async remove(id: number) {
    try{
      await prisma.product.delete({where:{id:id}})
    }
    catch(error){
      return error
    }
    return {message:'Produto deletado com sucesso!'};
  }
}
