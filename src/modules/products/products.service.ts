import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./repository/products.repository";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async findAll(data: Prisma.ProductsWhereInput) {
        return this.productsRepository.findAll(data);
    }

    async findById(id: number) {
        return await this.productsRepository.findById(id);
    }

    async create(data: Prisma.ProductsUncheckedCreateInput) {
        return this.productsRepository.create(data);
    }

    async update(id: number, data: Prisma.ProductsUpdateInput) {
        return this.productsRepository.update(id, data);
    }

    async delete(id: number) {
        return this.productsRepository.delete(id);
    }
}