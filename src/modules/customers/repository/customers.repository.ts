import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(data: Prisma.CustomersWhereInput) {
    return this.prismaService.getClient().customers.findMany({ where: data });
  }

  async findByEmail(email: string) {
    return this.prismaService
      .getClient()
      .customers.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prismaService
      .getClient()
      .customers.findUnique({ where: { id } });
  }

  async findActiveById(id: number) {
    return this.prismaService
      .getClient()
      .customers.findUnique({ where: { id, active: true } });
  }

  async create(data: Prisma.CustomersUncheckedCreateInput) {
    return this.prismaService.getClient().customers.create({ data });
  }

  async update(id: number, data: Prisma.CustomersUpdateInput) {
    return this.prismaService
      .getClient()
      .customers.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prismaService.getClient().customers.delete({ where: { id } });
  }
}
