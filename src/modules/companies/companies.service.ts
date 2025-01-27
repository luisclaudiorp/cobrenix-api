import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from './repository/companies.respository';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesRepository: CompaniesRepository) {}

  async findAll(data: Prisma.CompaniesWhereInput) {
    return this.companiesRepository.findAll(data);
  }

  async findById(id: number) {
    return await this.companiesRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.companiesRepository.findByEmail(email);
  }

  async create(data: Prisma.CompaniesCreateInput) {
    return this.companiesRepository.create(data);
  }

  async update(id: number, data: Prisma.CompaniesUpdateInput) {
    return this.companiesRepository.update(id, data);
  }

  async delete(id: number) {
    return this.companiesRepository.delete(id);
  }
}
