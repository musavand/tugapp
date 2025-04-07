/* eslint-disable prettier/prettier */
import { Body, Controller,Delete,Get,Param,Post, Put } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company } from './entities/company.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/create-company.dto';

@ApiTags('companyy controller')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiOperation({ summary: 'get all companies' })
  @Get()
  async findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }
  @ApiOperation({ summary: 'get a company by id' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Company> {
    return this.companiesService.findById(id);
  }
  @ApiOperation({ summary: 'create a company' })
  @Post()
  async create(@Body() company: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(company.company_name);
  }
  @ApiOperation({ summary: 'update a company' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() company: CreateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(parseInt(id, 10), company);
  }
  @ApiOperation({ summary: 'delete a company' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.companiesService.delete(parseInt(id, 10));
  }
}
