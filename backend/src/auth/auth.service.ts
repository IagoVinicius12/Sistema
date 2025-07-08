import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(login:LoginDto, res:Response): Promise<{ access_token: string }> {
    const email=login.email
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user){
      throw new NotFoundException()
    }
    const pass=await bcrypt.compare(login.password,user?.password)

    if (!pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    const token= await this.jwtService.signAsync(payload)
    res.cookie('access_token',token,{
      httpOnly:true,
      sameSite:'lax',
      secure:true,
      maxAge:60*1000*60
    })
    return {
      access_token:token
    };
  }
  async logout(res:Response){
    res.clearCookie('access_token')
    return 'Logout realizado com sucesso'
  }

  async validateUserById(userId: number) {
    return this.userService.findOne( userId );
  }
}

