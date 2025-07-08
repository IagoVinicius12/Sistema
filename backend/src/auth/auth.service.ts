import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

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

    if (!user || user.password !== login.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    const token= await this.jwtService.signAsync(payload)
    res.cookie('access_token',token,{
      httpOnly:true,
      sameSite:'lax',
      secure:true,
      maxAge:60*1000
    })
    return {
      access_token:token
    };
  }

  async validateUserById(userId: number) {
    return this.userService.findOne( userId );
  }
}

