/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { SubcategoryService } from 'src/subcategory/subcategory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CompaniesService } from 'src/companies/companies.service';
import RedisCache from '../shared/redis/RedisCache';

const CASHED_PRODUCTS_LIST = 'CASHED_PRODUCTS_LIST';

@Injectable()
export class ProductsService {
  
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
    private readonly subCategoryService: SubcategoryService,
    private readonly companyService: CompaniesService,
  ) {}

  async findAll(): Promise<Product[]> {
    //return with cash
    const redisCache = new RedisCache();
    let products_redis =
      await redisCache.recover<Product[]>(CASHED_PRODUCTS_LIST);
    if (!products_redis) {
      products_redis = await this.productRepository.find();
      await redisCache.save(CASHED_PRODUCTS_LIST, products_redis);
    }
    return products_redis;
    //return without cash
    //return this.productRepository.find();
  }
  async findById(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id: id } });
  }
  async update(id: number, product: CreateProductDto): Promise<Product> {
    const existProdcut = await this.productRepository.findOne({
      where: { id: id },
    });
    if (!existProdcut) {
      throw new HttpException(
        `product by id ${id} dos not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { product_name, categoryId, subcategoryId, companyId } = product;
    if (!product_name) {
      throw new HttpException(
        'product name was not entried',
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
    const cmp = this.companyService.findById(companyId);
    if (!cmp) {
      throw new HttpException(
        ` company by id ${companyId} dos not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (subcategoryId) {
      const sc = this.subCategoryService.findById(subcategoryId);
      if (!sc) {
        throw new HttpException(
          ` sub category by id ${subcategoryId} dos not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    ////////////////////////////////////////////////////////////
    const newProduct = {
      ...product,
      categoryId: categoryId,
      subcategoryId: subcategoryId,
      companyId: companyId,
      updateTime: new Date(),
    };
    try {
      const redisCache = new RedisCache();
      await redisCache.invalidate(CASHED_PRODUCTS_LIST);

      await this.productRepository.update(id, newProduct);
      return this.productRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException(
        `can not update product by name =  ${newProduct.product_name} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async delete(id: number): Promise<void> {
    const prd = await this.productRepository.findOne({
      where: { id },
    });
    if (!prd) {
      throw new HttpException(
        `Product ID ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const redisCache = new RedisCache();

      await redisCache.invalidate(CASHED_PRODUCTS_LIST);

      await this.productRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `can not delete product by id =  ${id} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async create(product: CreateProductDto) {
    const { product_name, categoryId, subcategoryId, companyId } = product;
    if (!product_name) {
      throw new HttpException(
        'product name was not entried',
        HttpStatus.BAD_REQUEST,
      );
    }

    const prd = await this.productRepository.findOne({
      where: { product_name },
    });
    if (prd) {
      throw new HttpException(
        'product allready exists',
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
    const cmp = this.companyService.findById(companyId);
    if (!cmp) {
      throw new HttpException(
        ` company by id ${companyId} dos not exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (subcategoryId) {
      const sc = this.subCategoryService.findById(subcategoryId);
      if (!sc) {
        throw new HttpException(
          ` sub category by id ${subcategoryId} dos not exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const newProduct: Product = await this.productRepository.create({
      ...product,
      categoryId,
      subcategoryId,
      companyId,
    });
    newProduct.categoryId = categoryId;
    newProduct.subcategoryId = subcategoryId;
    newProduct.companyId = companyId;
    try {
      const redisCache = new RedisCache();
      await redisCache.invalidate(CASHED_PRODUCTS_LIST);
      const created = await this.productRepository.save(newProduct);
      return created;
    } catch (error) {
      throw new HttpException(
        `can not create product by name =  ${newProduct.product_name} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}