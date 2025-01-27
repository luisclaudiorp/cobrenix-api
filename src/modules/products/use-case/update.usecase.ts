import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ProductsService } from "../products.service";
import { UpdateProductsDto } from "../dto/update-products.dto";

@Injectable()
export class UpdateUseCase {
  private logger: Logger;
  constructor(private readonly productsService: ProductsService) {
    this.logger = new Logger(UpdateUseCase.name);
  }

  async execute(id: number, updateProductsDto: UpdateProductsDto) {
    try {
      this.logger.log('updateProductsDto', updateProductsDto);

      const foundProduct = await this.productsService.findById(id);

      if (!foundProduct) {
        throw new NotFoundException('Product not found');
      }
      
      return await this.productsService.update(id, updateProductsDto);
    } catch (error) {
      this.logger.warn('Error to update product', error);
      throw error;
    }
  }
}