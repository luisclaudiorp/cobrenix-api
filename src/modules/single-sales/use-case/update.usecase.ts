import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SingleSalesService } from '../single-sales.service';
import { UpdateSingleSalesDto } from '../dto/update.single-sales.dto';
import { SaleRuleService } from 'src/shared/services/saleRule.service';

@Injectable()
export class UpdateUseCase {
  private logger: Logger;
  constructor(
    private readonly singleSalesService: SingleSalesService,
    private readonly saleRuleService: SaleRuleService,
  ) {
    this.logger = new Logger(UpdateUseCase.name);
  }

  async execute(id: number, updateSingleSalesDto: UpdateSingleSalesDto) {
    try {
      this.logger.log('updateSingleSalesDto', updateSingleSalesDto);

      const foundSingleSales = await this.singleSalesService.findById(id);

      if (!foundSingleSales) {
        throw new NotFoundException('SingleSales not found');
      }

      const value = await this.saleRuleService.manageProducts(
        updateSingleSalesDto.companyId,
        updateSingleSalesDto.customerId,
        updateSingleSalesDto.productIds,
        updateSingleSalesDto.discount || 0,
      );

      const updatedData = {
        ...updateSingleSalesDto,
        value,
      };

      return await this.singleSalesService.update(id, updatedData);
    } catch (error) {
      this.logger.warn('Error to update SingleSales', error);
      throw error;
    }
  }
}
