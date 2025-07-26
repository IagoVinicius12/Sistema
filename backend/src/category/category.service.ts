import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {PrismaClient } from 'generated/prisma';

const prisma=new PrismaClient()

@Injectable()
export class CategoryService {
  async create(createCategoryDto: CreateCategoryDto) {
    const category=createCategoryDto
    try{
      if(!category){
        throw new ConflictException('Categoria já existe')
      }
      const create_cat=await prisma.category.create({
        data:{
          name:category.name
        }
      })
      return create_cat

    }catch(error){
      throw error
    }
  }

  async findAll() {
    try{
      const categories=await prisma.category.findMany()
      if(!categories){
        throw new NotFoundException('Não foi achada nenhuma categoria')
      }
      return categories
    }catch(error){
      throw error
    }
  }

  async findOne(id: number) {
    try{
      const category= await prisma.category.findUnique({where:{id:id}})
      if(!category){
        throw new NotFoundException('Não foi encontrada a categoria desejada')
      }
      return category
    }catch(error){
      throw error
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async add_product(id:number, name:string){
    const category= await prisma.category.findUnique({where:{id:id}})
    const prod= await prisma.product.findFirst({where:{name:name}})

    try{
      if(!category){
        throw new NotFoundException('Categoria não encontrada!!')
      }
      if(!prod){
        throw new NotFoundException('Produto não encontrado!')
      }
      const category_updated=await prisma.category.update({
        where:{id:id},
        data:{
          products:{
            connect:{
              id:prod.id
            }
          }
        }
      })
      return category_updated
    }catch(error){
      throw error
    }
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
