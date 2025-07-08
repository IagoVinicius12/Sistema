import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('user')
@Injectable()
export class  UserController {
  constructor(private prisma: PrismaService, private userService:UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
