/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubCategory } from './entities/subcategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-subcategory.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subcategoryRepository: Repository<SubCategory>,
    private readonly categoryService :CategoryService,
  ) {}

  async findAll(): Promise<SubCategory[]> {
    return this.subcategoryRepository.find();
  }
  async findById(id: number): Promise<SubCategory> {
    return this.subcategoryRepository.findOne({ where: { id: id } });
  }
  async update(
    id: number,
    subcategory: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const existSC = await this.subcategoryRepository.findOne({
      where: { id: id },
    });
    if (!existSC) {
      throw new HttpException(
        `sub category by id ${id} dos not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { categoryId, subcategory_name } = subcategory;
    const cat = this.categoryService.findById(categoryId);
    if (!cat) {
      throw new HttpException(
        ` category by id ${categoryId} dos not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newSubCategory = {
      ...subcategory,
      categoryId : categoryId,
      updateTime: new Date(),
    };
    try{
    await this.subcategoryRepository.update(id, newSubCategory);
    return this.subcategoryRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        `can not update sub category by name =  ${newSubCategory.subcategory_name} `,
        HttpStatus.BAD_REQUEST,
      );
    }
    
  }
  async delete(id: number): Promise<void> {
    try{
    await this.subcategoryRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `can not delete sub category by id =  ${id} `,
        HttpStatus.BAD_REQUEST,
      );
    }
    
  }
  async create(subcategory: CreateSubCategoryDto) {
    const { subcategory_name, categoryId } = subcategory;
    if (!subcategory_name) {
      throw new HttpException(
        'subcategory name was not entried',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sc = await this.subcategoryRepository.findOne({
      where: { subcategory_name },
    });
    if (sc) {
      throw new HttpException(
        'subcategory allready exists',
        HttpStatus.BAD_REQUEST,
      );
    }
     const cat = this.categoryService.findById(categoryId);
     if (!cat) {
       throw new HttpException(
         ` category by id ${categoryId} dos not exist`,
         HttpStatus.BAD_REQUEST,
       );
     }
    const newSubcategory: SubCategory = await this.subcategoryRepository.create(
      {
        ...subcategory,
        
      },
    );
    newSubcategory.categoryId = categoryId;
    try {
      const created = await this.subcategoryRepository.save(newSubcategory);
      return created;
    } catch (error) {
      throw new HttpException(
        `can not create sub category by name =  ${newSubcategory.subcategory_name} `,
        HttpStatus.BAD_REQUEST,
      );
    }
    
  }
}

   
