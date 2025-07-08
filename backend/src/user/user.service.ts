import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient()
@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const new_user=createUserDto;
    try{
      const verification= await prisma.user.findUnique({where:{email:new_user.email}}) 
      if(verification){
        throw new ConflictException('O email já está cadastrado')
      }
      const senha_hash=await bcrypt.hash(new_user.password,10)
      const cadastrando_usuario= await prisma.user.create({
        data:{
          email:new_user.email,
          password: senha_hash,
          name: new_user.name,
          created_at: new Date()
        }
      })
      return cadastrando_usuario;
    }
    catch(error){
      return error
    }
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async findOne(id: number) {

    const userId=id;

    try{
      const user= await prisma.user.findUnique({where:{id:userId}})
      if(!user){
        throw new NotFoundException('O usuário não existe!')
      }
      return user
    }
    catch(error){
      return error
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
