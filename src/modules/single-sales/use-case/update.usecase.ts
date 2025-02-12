import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SingleSalesService } from '../single-sales.service';
import { UpdateSingleSalesDto } from '../dto/update.single-sales.dto';
import { SaleRuleService } from 'src/shared/services/saleRule.service';
import { Prisma } from '@prisma/client';
import { Products } from 'src/shared/interfaces/products.interface';

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
        foundSingleSales.companyId,
        foundSingleSales.customerId,
        updateSingleSalesDto.productIds,
        updateSingleSalesDto.discount || 0,
      );

      await this.disconnectProducts(foundSingleSales.products, id);

      const updatedData: Prisma.SingleSalesUncheckedUpdateInput = {
        name: updateSingleSalesDto.name,
        discount: updateSingleSalesDto.discount || 0,
        active: updateSingleSalesDto.active,
        value,
        products: {
          connect: updateSingleSalesDto.productIds.map((productId) => ({
            id: productId,
          })),
        },
      };

      return await this.singleSalesService.update(id, updatedData);
    } catch (error) {
      this.logger.warn('Error to update SingleSales', error);
      throw error;
    }
  }

  private async disconnectProducts(products: Products[], id: number) {
    if (!products.length) {
      return;
    }

    const disconnectProducts: Prisma.SingleSalesUncheckedUpdateInput = {
      products: {
        disconnect: products.map((product) => ({
          id: product.id,
        })),
      },
    };

    return await this.singleSalesService.update(id, disconnectProducts);
  }
}
