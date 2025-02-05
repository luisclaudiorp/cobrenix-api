import { Injectable, Logger } from '@nestjs/common';
import { CustomersService } from '../customers.service';
import { FindAllCustomersDto } from '../dto/find-all-customers.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FindAllUseCase {
  private logger: Logger;
  constructor(private readonly customersService: CustomersService) {
    this.logger = new Logger(FindAllUseCase.name);
  }

  async execute(query: FindAllCustomersDto) {
    try {
      const data = this.createQuery(query);
      return this.customersService.findAll(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private createQuery(query: FindAllCustomersDto): Prisma.CustomersWhereInput {
    const { name, email, id, companyId, active } = query;

    const where = {} as Prisma.CustomersWhereInput;

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (email) {
      where.email = { equals: email };
    }

    if (id) {
      where.id = { equals: id };
    }

    if (companyId) {
      where.companyId = { equals: companyId };
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
