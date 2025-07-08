
import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() login:LoginDto, @Res({passthrough:true}) res:Response) {
    return this.authService.signIn(login,res);
  }
}
