import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { FindAllUserDto } from '../dto/find-all-user.dto';

@Injectable()
export class UserRespository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(query: Prisma.UsersWhereInput) {
    return this.prismaService
      .getClient()
      .users.findMany({ where: query, include: { companies: true } });
  }

  async findByEmail(email: string) {
    return this.prismaService
      .getClient()
      .users.findUnique({ where: { email }, include: { companies: true } });
  }

  async findById(id: number) {
    return this.prismaService.getClient().users.findUnique({
      where: { id },
      include: {
        companies: true,
      },
    });
  }

  async create(data: Prisma.UsersCreateInput) {
    return this.prismaService.getClient().users.create({ data });
  }

  async update(id: number, data: Prisma.UsersUpdateInput) {
    return this.prismaService.getClient().users.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prismaService.getClient().users.delete({ where: { id } });
  }
}
