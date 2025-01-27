import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ProductsService } from "../products.service";

@Injectable()
export class DeleteUseCase {
    logger: Logger;
    constructor(private readonly productsService: ProductsService) {
      this.logger = new Logger(DeleteUseCase.name);
    }

  async execute(id: number) {
    try {
      this.logger.log('Delete product', id);

      const foundProduct = await this.productsService.findById(id);

      if (!foundProduct) {
        throw new NotFoundException('Product not found');
      }

      return await this.productsService.update(id, { active: false });
    } catch (error) {
      this.logger.warn('Error to delete product', error);
      throw error;
    }
  }
}