/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('product controller')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'get all products' })
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
  @ApiOperation({ summary: 'get a product by id' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Product> {
    return this.productsService.findById(id);
  }
  @ApiOperation({ summary: 'create a product' })
  @Post()
  async create(@Body() product: CreateProductDto): Promise<Product> {
    return this.productsService.create(product);
  }
  @ApiOperation({ summary: 'update a product' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(parseInt(id, 10), product);
  }
  @ApiOperation({ summary: 'delete a product' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productsService.delete(parseInt(id, 10));
  }
}