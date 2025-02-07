import { Injectable } from '@nestjs/common';
import { SingleSalesRepository } from './repository/single-sales.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class SingleSalesService {
  constructor(private readonly singleSalesRepository: SingleSalesRepository) {}

  async create(data: Prisma.SingleSalesUncheckedCreateInput) {
    return this.singleSalesRepository.create(data);
  }

  async findAll(data: Prisma.SingleSalesWhereInput) {
    return this.singleSalesRepository.findAll(data);
  }

  async findById(id: number) {
    return this.singleSalesRepository.findById(id);
  }
}
