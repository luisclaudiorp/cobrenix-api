import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CompaniesService } from '../companies.service';

@Injectable()
export class DeleteUseCase {
  logger: Logger;
  constructor(private readonly companiesService: CompaniesService) {
    this.logger = new Logger(DeleteUseCase.name);
  }
  async execute(id: number) {
    try {
      this.logger.log('Delete company', id);

      const foundCompany = await this.companiesService.findById(id);

      if (!foundCompany) {
        throw new NotFoundException('Company not found');
      }

      return await this.companiesService.update(id, { active: false });
    } catch (error) {
      this.logger.warn('Error to delete company', error);
      throw error;
    }
  }
}
