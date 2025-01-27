import { Injectable, Logger } from "@nestjs/common";
import { ProductsService } from "../products.service";
import { CreateProductsDto } from "../dto/create-products.dto";

@Injectable()
export class CreateUseCase {
    logger: Logger;
  constructor(private readonly productsService: ProductsService) {
    this.logger = new Logger(CreateUseCase.name);
  }

  async execute(createProductsDto: CreateProductsDto) {
    try {
      this.logger.log('createProductsDto', createProductsDto);
        return await this.productsService.create(createProductsDto);
    } catch (error) {
      this.logger.warn('Error to create new product', error);
      throw error;
    }
  }
}