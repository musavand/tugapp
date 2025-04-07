/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'category' })
  @IsNotEmpty({ message: 'enter category name' })
  @IsString()
  category_name: string;
}
