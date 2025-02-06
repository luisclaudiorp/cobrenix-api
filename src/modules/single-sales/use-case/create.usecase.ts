import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSingleSalesDto } from '../dto/create-single-sales.dto';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { ProductsService } from 'src/modules/products/products.service';
import { SingleSalesService } from '../single-sales.service';

@Injectable()
export class CreateUseCase {
  logger: Logger;
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService,
    private readonly singleSalesService: SingleSalesService,
  ) {
    this.logger = new Logger(CreateUseCase.name);
  }

  async execute(createSingleSalesDto: CreateSingleSalesDto) {
    try {
      this.logger.log('createSingleSalesDto', createSingleSalesDto);

      await this.validateFields(
        createSingleSalesDto.companyId,
        createSingleSalesDto.customerId,
        createSingleSalesDto.productIds,
      );

      return await this.singleSalesService.create(createSingleSalesDto);
    } catch (error) {
      this.logger.warn('Error to create new single sales', error);
      throw error;
    }
  }

  private async validateFields(
    companyId: number,
    customerId: number,
    productIds: number[],
  ): Promise<void> {
    const [company, customer] = await Promise.all([
      this.companiesService.findById(companyId),
      this.customersService.findActiveById(customerId),
    ]);

    if (!company || !customer) {
      throw new NotFoundException(
        `Company with ID ${companyId} or Customer with ID ${customerId} not found.`,
      );
    }

    const foundProducts = await Promise.all(
      productIds.map((productId) => this.productsService.findById(productId)),
    );

    const notFoundProducts = foundProducts.filter((product) => !product);

    if (notFoundProducts.length) {
      throw new NotFoundException(`Products not found.`);
    }
  }
}
