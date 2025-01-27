import { FindAllCompaniesDto } from '../dto/find-all-companies.dto';
import { CompaniesService } from '../companies.service';
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FindAllUseCase {
  private logger: Logger;
  constructor(private readonly companiesService: CompaniesService) {
    this.logger = new Logger(FindAllUseCase.name);
  }

  async execute(query: FindAllCompaniesDto) {
    try {
      const data = this.createQuery(query);
      return this.companiesService.findAll(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private createQuery(query: FindAllCompaniesDto): Prisma.CompaniesWhereInput {
    const { name, email, id, active } = query;

    const where = {} as Prisma.CompaniesWhereInput;

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (email) {
      where.email = { equals: email };
    }

    if (id) {
      where.id = { equals: id };
    }

    if (active == undefined) {
      where.active = { equals: true };
    } else {
      where.active = { equals: active };
    }

    this.logger.log('findAll', { where });
    return where;
  }
}
