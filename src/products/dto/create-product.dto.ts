/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'product' })
  @IsNotEmpty({ message: 'enter product name' })
  @IsString()
  product_name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'enter company id' })
  @ApiProperty({ description: 'company id' })
  readonly companyId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'enter category id' })
  @ApiProperty({ description: 'category id' })
  readonly categoryId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'enter sub categoryId id' })
  @ApiProperty({ description: 'sub company id' })
  readonly subcategoryId: number;
}
