import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CompaniesService } from '../companies.service';
import { UpdateCompaniesDto } from '../dto/update-companies.dto';

@Injectable()
export class UpdateUseCase {
  private logger: Logger;
  constructor(private readonly companiesService: CompaniesService) {
    this.logger = new Logger(UpdateUseCase.name);
  }

  async execute(id: number, updateCompaniesDto: UpdateCompaniesDto) {
    try {
      this.logger.log('updateCompaniesDto', updateCompaniesDto);

      const foundCompany = await this.companiesService.findById(id);

      if (!foundCompany) {
        throw new NotFoundException('Company not found');
      }

      if (updateCompaniesDto.email) {
        const companyByEmail = await this.companiesService.findByEmail(
          updateCompaniesDto.email,
        );

        if (companyByEmail && companyByEmail.id !== id) {
          throw new BadRequestException('Company already exists');
        }
      }

      return await this.companiesService.update(id, updateCompaniesDto);
    } catch (error) {
      this.logger.warn('Error to update company', error);
      throw error;
    }
  }
}
