/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('category controller')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiOperation({ summary: 'get all categories' })
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }
  @ApiOperation({ summary: 'get a category by id' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }
  @ApiOperation({ summary: 'create new category' })
  @Post()
  async create(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(category.category_name);
  }
  @ApiOperation({ summary: 'update a category' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(parseInt(id, 10), category);
  }
  @ApiOperation({ summary: 'delete a category' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(parseInt(id, 10));
  }
}