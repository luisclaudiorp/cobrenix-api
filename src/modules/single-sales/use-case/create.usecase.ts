import { Injectable, Logger } from '@nestjs/common';
import { CreateSingleSalesDto } from '../dto/create-single-sales.dto';
import { SingleSalesService } from '../single-sales.service';
import { Prisma } from '@prisma/client';
import { SaleRuleService } from 'src/shared/services/saleRule.service';

@Injectable()
export class CreateUseCase {
  logger: Logger;
  constructor(
    private readonly singleSalesService: SingleSalesService,
    private readonly saleRuleService: SaleRuleService,
  ) {
    this.logger = new Logger(CreateUseCase.name);
  }

  async execute(createSingleSalesDto: CreateSingleSalesDto) {
    try {
      this.logger.log('createSingleSalesDto', createSingleSalesDto);

      const value = await this.saleRuleService.manageProducts(
        createSingleSalesDto.companyId,
        createSingleSalesDto.customerId,
        createSingleSalesDto.productIds,
        createSingleSalesDto.discount || 0,
      );

      const data: Prisma.SingleSalesUncheckedCreateInput = {
        companyId: createSingleSalesDto.companyId,
        customerId: createSingleSalesDto.customerId,
        discount: createSingleSalesDto.discount,
        name: createSingleSalesDto.name,
        value,
        products: {
          connect: createSingleSalesDto.productIds.map((productId) => ({
            id: productId,
          })),
        },
      };

      await this.singleSalesService.create(data);
    } catch (error) {
      this.logger.warn('Error to create new single sales', error);
      throw error;
    }
  }
}
