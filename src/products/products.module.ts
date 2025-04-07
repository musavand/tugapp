/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { SubcategoryModule } from 'src/subcategory/subcategory.module';

@Module({
  imports: [
  TypeOrmModule.forFeature([Product]),
  CategoryModule,
  CompaniesModule,
  SubcategoryModule,
],  
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
