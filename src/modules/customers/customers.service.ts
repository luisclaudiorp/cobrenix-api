import { Injectable } from '@nestjs/common';
import { CustomersRepository } from './repository/customers.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async findAll(data: Prisma.CustomersWhereInput) {
    return this.customersRepository.findAll(data);
  }

  async findById(id: number) {
    return await this.customersRepository.findById(id);
  }

  async findActiveById(id: number) {
    return await this.customersRepository.findActiveById(id);
  }

  async findByEmail(email: string) {
    return await this.customersRepository.findByEmail(email);
  }

  async create(data: Prisma.CustomersUncheckedCreateInput) {
    return this.customersRepository.create(data);
  }

  async update(id: number, data: Prisma.CustomersUpdateInput) {
    return this.customersRepository.update(id, data);
  }

  async delete(id: number) {
    return this.customersRepository.delete(id);
  }
}
