import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import passport from 'passport';


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
      const {password,...user_no_pass}=cadastrando_usuario
      return user_no_pass;
    }
    catch(error){
      return error
    }
  }

  async findAll() {
  const users = await prisma.user.findMany();

  const usersWithoutPassword = users.map(({ password, ...user }) => user);

  return usersWithoutPassword;
}

  async findOne(id: number) {

    const userId=id;

    try{
      const user= await prisma.user.findUnique({where:{id:userId}})
      if(!user){
        throw new NotFoundException('O usuário não existe!')
      }
      const {password,...user_no_pass}=user
      return user_no_pass
    }
    catch(error){
      return error
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
      const user_to_update= await prisma.user.findUnique({where:{id:id}})
      if(!user_to_update){
        throw new NotFoundException('Usuário não encontrado!')
      }
      const control=await prisma.user.update({
        where:{id:id},
        data:{
          name:updateUserDto.name||user_to_update.name,
          password:user_to_update.password,
          email:user_to_update.email
        }
      }
      )
      const {password,...user_return}=control
      return user_return
    }
    catch(error){
      error
    }
  }

  async remove(id: number) {
    try{
      await prisma.user.delete({where:{id:id}})
    }catch(error){
      return error
    }
    return {message:'Usuário deletado com sucesso!'};
  }
}
