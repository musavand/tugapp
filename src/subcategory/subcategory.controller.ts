/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubCategory } from './entities/subcategory.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';

@ApiTags('subcategory controller')
@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @ApiOperation({ summary: 'get all subcategories' })
  @Get()
  async findAll(): Promise<SubCategory[]> {
    return this.subcategoryService.findAll();
  }
  @ApiOperation({ summary: 'get a subcategory by id' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<SubCategory> {
    return this.subcategoryService.findById(id);
  }
  @ApiOperation({ summary: 'create a subcategory' })
  @Post()
  async create(
    @Body() subcategory: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.subcategoryService.create(subcategory);
  }
  @ApiOperation({ summary: 'update a subcategory' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() subcategory: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return this.subcategoryService.update(parseInt(id, 10), subcategory);
  }
  @ApiOperation({ summary: 'delete a subcategory' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.subcategoryService.delete(parseInt(id, 10));
  }
}