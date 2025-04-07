/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'company' })
  @IsNotEmpty({ message: 'enter comaony name' })
  @IsString()
  company_name: string;
}
