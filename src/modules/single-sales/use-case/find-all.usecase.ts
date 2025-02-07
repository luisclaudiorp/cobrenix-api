import { Injectable, Logger } from '@nestjs/common';
import { SingleSalesService } from '../single-sales.service';
import { FindAllSingleSalesDto } from '../dto/find-all-single-sales.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FindAllUseCase {
  private logger: Logger;
  constructor(private readonly singleSalesService: SingleSalesService) {
    this.logger = new Logger(FindAllUseCase.name);
  }

  async execute(query: FindAllSingleSalesDto) {
    try {
      const data = this.createQuery(query);
      return await this.singleSalesService.findAll(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private createQuery(
    query: FindAllSingleSalesDto,
  ): Prisma.SingleSalesWhereInput {
    const {
      name,
      id,
      companyId,
      customerId,
      productIds,
      active,
      value,
      discount,
    } = query;

    const where: Prisma.SingleSalesWhereInput = {};

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (id) {
      where.id = { equals: id };
    }

    if (companyId) {
      where.companyId = { equals: companyId };
    }

    if (customerId) {
      where.customerId = { equals: customerId };
    }

    if (value) {
      where.value = { equals: value };
    }

    if (discount) {
      where.discount = { equals: discount };
    }

    if (productIds && productIds.length) {
      where.products = { some: { id: { in: productIds } } };
    }

    if (active === undefined) {
      where.active = { equals: true };
    } else {
      where.active = { equals: active };
    }

    return where;
  }
}
