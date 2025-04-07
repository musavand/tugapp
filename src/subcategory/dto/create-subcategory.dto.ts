/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @ApiProperty({ description: 'sub category name' })
  @IsNotEmpty({ message: 'enter sub category name' })
  @IsString()
  subcategory_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'enter category id' })
  @ApiProperty({ description: 'category id' })
  readonly categoryId: number;
}
