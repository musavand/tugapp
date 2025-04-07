/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}
  async  create(companyName :string){    
    try{
    return await this.companyRepository.save({company_name :companyName });
    } catch (error) {
      throw new HttpException(
        `can not update product by name =  ${companyName} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }
  async findById(id: number): Promise<Company> {
    return this.companyRepository.findOne({ where: { id: id } });
  }
  async update(id: number, company ): Promise<Company> {
   const existCompany = await this.companyRepository.findOne({
     where: { id: id },
   });
       if (!existCompany) {
         throw new HttpException(
           `company by id ${id} dos not exist`,
           HttpStatus.BAD_REQUEST,
         );
       }
       
       
       const newCompany = {
         ...company,
         updateTime: new Date(),
       };   
       try{
       await this.companyRepository.update(id, newCompany);
       return this.companyRepository.findOne({ where: { id: id } });
       } catch (error) {
      throw new HttpException(
        `can not update company by name =  ${newCompany.company_name} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async delete(id: number): Promise<void> {
    try{
    await this.companyRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        `can not delete company by id =  ${id} `,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}