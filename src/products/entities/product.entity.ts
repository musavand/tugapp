/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Company } from 'src/companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { SubCategory } from '../../subcategory/entities/subcategory.entity';
import { Exclude } from 'class-transformer';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  product_name: string;

  ////////////////////fg mandatory for company id
  @Exclude()
  @ManyToOne(() => Company, (company) => company.id, {
    // cascade: true,
  })
  @JoinColumn({
    name: 'companyId',
  })
  @Column({
    name: 'companyId',
  })
  companyId: number;

  ////////////////////fg mandatory for cat id
  @Exclude()
  @ManyToOne(() => Category, (category) => category.id, {
    // cascade: true,
  })
  @JoinColumn({
    name: 'categoryId',
  })
  @Column({
    name: 'categoryId',
  })
  categoryId: number;

  ////////////////////fg arbitrary for sub cat id
  @Exclude()
  @ManyToOne(() => SubCategory, (subcategory) => subcategory.id, {
    // cascade: true,
  })
  @JoinColumn({
    name: 'subcategoryId',
  })
  @Column({
    name: 'subcategoryId',
    nullable: true,
  })
  subcategoryId: number;

  @Column({
    type: 'timestamp',
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column({
    type: 'timestamp',
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;
}
