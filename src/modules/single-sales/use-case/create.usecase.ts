import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSingleSalesDto } from '../dto/create-single-sales.dto';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { ProductsService } from 'src/modules/products/products.service';
import { SingleSalesService } from '../single-sales.service';
import { Prisma } from '@prisma/client';

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

      const value = await this.manageProducts(
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

  private async manageProducts(
    companyId: number,
    customerId: number,
    productIds: number[],
    discount?: number,
  ): Promise<number> {
    const [company, customer] = await Promise.all([
      this.companiesService.findById(companyId),
      this.customersService.findActiveById(customerId),
    ]);

    if (!company || !customer) {
      throw new NotFoundException(
        `Company with ID ${companyId} or Customer with ID ${customerId} not found.`,
      );
    }

    const customerInCompany = !!company.customers.find(
      (customer) => customer.id == customerId,
    );

    if (customerInCompany === false) {
      throw new NotFoundException(
        `Customer with ID ${customerId} not found in Company with ID ${companyId}.`,
      );
    }

    const foundProducts = await Promise.all(
      productIds.map((productId) => this.productsService.findById(productId)),
    );

    const notFoundProducts = foundProducts.filter((product) => !product);

    if (notFoundProducts.length) {
      throw new NotFoundException(`Products not found.`);
    }

    const productsNotInCompany = foundProducts
      .map((product, index) =>
        product && product.companyId !== companyId ? productIds[index] : null,
      )
      .filter((id) => id !== null);

    if (productsNotInCompany.length) {
      throw new NotFoundException(
        `Products with ID: (${productsNotInCompany.join(', ')}) do not belong to the company with ID ${companyId}.`,
      );
    }

    const newValue = foundProducts
      .filter((product) => product !== null)
      .reduce((acc, product) => acc + product.value, 0);

    const discountValue = discount ? newValue * (1 - discount / 100) : newValue;

    return discountValue;
  }
}
