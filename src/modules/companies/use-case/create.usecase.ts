import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCompaniesDto } from '../dto/create-companies.dto';
import { CompaniesService } from '../companies.service';

@Injectable()
export class CreateUseCase {
  logger: Logger;
  constructor(private readonly companiesService: CompaniesService) {
    this.logger = new Logger(CreateUseCase.name);
  }

  async execute(createCompaniesDto: CreateCompaniesDto) {
    try {
      this.logger.log('createUserDto', createCompaniesDto);

      const foundCompany = await this.companiesService.findByEmail(
        createCompaniesDto.email,
      );

      if (foundCompany) {
        throw new BadRequestException('Company already exists');
      }

      return await this.companiesService.create(createCompaniesDto);
    } catch (error) {
      this.logger.warn('Error to create new company', error);
      throw error;
    }
  }
}
