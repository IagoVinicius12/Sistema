import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('products')
export class ProductsController {
  constructor(private prisma: PrismaService,private productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('listall')
  findAll() {
    return this.productsService.findAll();
  }

  @Get('listone/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
