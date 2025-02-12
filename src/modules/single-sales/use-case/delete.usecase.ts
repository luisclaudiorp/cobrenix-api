import { Injectable, Logger } from '@nestjs/common';
import { SingleSalesService } from '../single-sales.service';

@Injectable()
export class DeleteUseCase {
  logger: Logger;
  constructor(private readonly singleSalesService: SingleSalesService) {
    this.logger = new Logger(DeleteUseCase.name);
  }

  async execute(id: number) {
    try {
      this.logger.log('Delete single sales', id);

      const foundSingleSales = await this.singleSalesService.findById(id);

      if (!foundSingleSales) {
        throw new Error('Single sales not found');
      }

      return await this.singleSalesService.update(id, { active: false });
    } catch (error) {
      this.logger.warn('Error to delete single sales', error);
      throw error;
    }
  }
}
