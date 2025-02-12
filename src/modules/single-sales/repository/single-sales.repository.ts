import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class SingleSalesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.SingleSalesUncheckedCreateInput) {
    return this.prismaService.getClient().singleSales.create({ data });
  }

  async findAll(data: Prisma.SingleSalesWhereInput) {
    return this.prismaService
      .getClient()
      .singleSales.findMany({ where: data, include: { products: true } });
  }

  async findById(id: number) {
    return this.prismaService
      .getClient()
      .singleSales.findUnique({ where: { id }, include: { products: true } });
  }

  async update(id: number, data: Prisma.SingleSalesUpdateInput) {
    return this.prismaService
      .getClient()
      .singleSales.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prismaService.getClient().singleSales.delete({ where: { id } });
  }
}
