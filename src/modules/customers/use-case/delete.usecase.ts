import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CustomersService } from '../customers.service';

@Injectable()
export class DeleteUseCase {
  logger: Logger;
  constructor(private readonly customersService: CustomersService) {
    this.logger = new Logger(DeleteUseCase.name);
  }

  async execute(id: number) {
    try {
      this.logger.log('Delete customer', id);

      const foundCustomer = await this.customersService.findById(id);

      if (!foundCustomer) {
        throw new NotFoundException('Customer not found');
      }

      return await this.customersService.update(id, { active: false });
    } catch (error) {
      this.logger.warn('Error to delete customer', error);
      throw error;
    }
  }
}
