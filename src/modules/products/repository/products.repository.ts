import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/shared/services/prisma.service";

@Injectable()
export class ProductsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(data: Prisma.ProductsWhereInput) {
        return this.prismaService.getClient().products.findMany({ where: data });
    }

    async findById(id: number) {
        return this.prismaService.getClient().products.findUnique({ where: { id } });
    }

    async create(data: Prisma.ProductsUncheckedCreateInput) {
        return this.prismaService.getClient().products.create({ data });
    }

    async update(id: number, data: Prisma.ProductsUpdateInput) {
        return this.prismaService.getClient().products.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prismaService.getClient().products.delete({ where: { id } });
    }
}