import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { CustomersService } from 'src/modules/customers/customers.service';
import { ProductsService } from 'src/modules/products/products.service';

@Injectable()
export class SaleRuleService {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService,
  ) {}

  public async manageProducts(
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

    if (!customerInCompany) {
      throw new NotFoundException(
        `Customer with ID ${customerId} not found in Company with ID ${companyId}.`,
      );
    }

    const foundProducts = await Promise.all(
      productIds.map((productId) => this.productsService.findById(productId)),
    );

    const missingProductIds = productIds.filter(
      (_, index) => !foundProducts[index],
    );

    if (missingProductIds.length) {
      throw new NotFoundException(
        `Products with ID: (${missingProductIds.join(', ')}) not found.`,
      );
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
