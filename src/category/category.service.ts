/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
  async findById(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id: id } });
  }
  async update(id: number, category): Promise<Category> {
    
    const existCategory = await this.categoryRepository.findOne({where : {id:id}});
    if (!existCategory) {
      throw new HttpException(`category by id ${id} dos not exist`, HttpStatus.BAD_REQUEST);
    }
    
    
    const newCategory = {
      ...category,
      updateTime: new Date(),
    };
    try {
      await this.categoryRepository.update(id, newCategory);
      return this.categoryRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        `can not update category by name =  ${newCategory.category_name} `,
        HttpStatus.BAD_REQUEST,
      );
    }
    
  }
  async delete(id: number): Promise<void> {
    try 
    {
    await this.categoryRepository.delete(id);
    }
    catch(error){
      throw new HttpException(
        `can not delete category by id ${id} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async create(category_name: string) {  
    try {
      return await this.categoryRepository.save({ category_name });
    } catch (error) {
      throw new HttpException(
        `can not craete category by name =  ${category_name} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
