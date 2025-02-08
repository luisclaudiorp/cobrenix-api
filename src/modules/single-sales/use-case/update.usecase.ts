import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SingleSalesService } from '../single-sales.service';
import { UpdateSingleSalesDto } from '../dto/update.single-sales.dto';

@Injectable()
export class UpdateUseCase {
  private logger: Logger;
  constructor(private readonly singleSalesService: SingleSalesService) {
    this.logger = new Logger(UpdateUseCase.name);
  }

  async execute(id: number, updateSingleSalesDto: UpdateSingleSalesDto) {
    try {
      this.logger.log('updateSingleSalesDto', updateSingleSalesDto);

      const foundSingleSales = await this.singleSalesService.findById(id);

      if (!foundSingleSales) {
        throw new NotFoundException('SingleSales not found');
      }

      return await this.singleSalesService.update(id, updateSingleSalesDto);
    } catch (error) {
      this.logger.warn('Error to update SingleSales', error);
      throw error;
    }
  }
}
