import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ProductsService } from '../products.service';
import { CreateProductsDto } from '../dto/create-products.dto';
import { CompaniesService } from 'src/modules/companies/companies.service';

@Injectable()
export class CreateUseCase {
  logger: Logger;
  constructor(
    private readonly productsService: ProductsService,
    private readonly companiesService: CompaniesService,
  ) {
    this.logger = new Logger(CreateUseCase.name);
  }

  async execute(createProductsDto: CreateProductsDto) {
    try {
      this.logger.log('createProductsDto', createProductsDto);

      const foundCompany = await this.companiesService.findById(
        createProductsDto.companyId,
      );

      if (!foundCompany) {
        throw new BadRequestException('Company not found');
      }

      return await this.productsService.create(createProductsDto);
    } catch (error) {
      this.logger.warn('Error to create new product', error);
      throw error;
    }
  }
}
