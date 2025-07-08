import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { User } from './entities/user.entity';
import { userInfo } from 'os';
import { NotFoundError } from 'rxjs';

const prisma = new PrismaClient

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const new_user=createUserDto;
    console.log(process.env.JWT_SECRET)
    try{
      const verification= await prisma.user.findUnique({where:{email:new_user.email}}) 
      if(verification){
        throw new ConflictException('O email já está cadastrado')
      }
      const cadastrando_usuario= await prisma.user.create({
        data:{
          email:new_user.email,
          password: new_user.password,
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
