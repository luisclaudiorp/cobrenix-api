import { Injectable, Logger } from "@nestjs/common";
import { ProductsService } from "../products.service";
import { FindAllProductsDto } from "../dto/find-all-products.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class FindAllUseCase {
    private logger: Logger;
  constructor(private readonly productsService: ProductsService) {
    this.logger = new Logger(FindAllUseCase.name);
  }

  async execute(query: FindAllProductsDto) {
    try {
      const data = this.createQuery(query);
      return this.productsService.findAll(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private createQuery(query: FindAllProductsDto): Prisma.ProductsWhereInput {
    const { name, id, companyId, active } = query;

    const where = {} as Prisma.ProductsWhereInput;

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (id) {
      where.id = { equals: id };
    }

    if (companyId) {
      where.companyId = { equals: companyId };
    }

    if (active == undefined) {
      where.active = { equals: true };
    } else {
      where.active = { equals: active };
    }

    this.logger.log('findAll', { where });
    return where;
  }
}