import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class CompaniesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(data: Prisma.CompaniesWhereInput) {
    return this.prismaService.getClient().companies.findMany({ where: data });
  }

  async findByEmail(email: string) {
    return this.prismaService
      .getClient()
      .companies.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prismaService.getClient().companies.findUnique({
      where: { id },
      include: { customers: true, products: true },
    });
  }

  async create(data: Prisma.CompaniesCreateInput) {
    return this.prismaService.getClient().companies.create({ data });
  }

  async update(id: number, data: Prisma.CompaniesUpdateInput) {
    return this.prismaService
      .getClient()
      .companies.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prismaService.getClient().companies.delete({ where: { id } });
  }
}
