import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CustomersService } from '../customers.service';
import { UpdateCustomersDto } from '../dto/update-customers.dto';
import { hashPassword, validatePassword } from 'src/shared/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUseCase {
  logger: Logger;
  constructor(private readonly customersService: CustomersService) {
    this.logger = new Logger(UpdateUseCase.name);
  }

  async execute(id: number, updateCustomersDto: UpdateCustomersDto) {
    try {
      const { password, repetedPassword, lastPassword, ...rest } =
        updateCustomersDto;
      this.logger.log('updateCustomersDto', rest);

      const foundCustomer = await this.customersService.findById(id);

      if (!foundCustomer) {
        throw new NotFoundException('Customer not found');
      }

      if (rest.email) {
        const customerByEmail = await this.customersService.findByEmail(
          rest.email,
        );

        if (customerByEmail && customerByEmail.id !== id) {
          throw new BadRequestException('Customer already exists');
        }
      }

      if (lastPassword) {
        this.verifyPassword(
          lastPassword,
          foundCustomer.password,
          password,
          repetedPassword,
        );
      }

      const customerToUpdate = {
        name: rest.name,
        email: rest.email,
        password: password && hashPassword(password),
      };

      return await this.customersService.update(id, customerToUpdate);
    } catch (error) {
      this.logger.warn('Error updating customer', error);
      throw error;
    }
  }

  private verifyPassword(
    lastPassword: string,
    currentPassword: string,
    newPassword: string,
    repetedPassword: string,
  ) {
    if (
      (newPassword && !repetedPassword) ||
      (!newPassword && repetedPassword)
    ) {
      throw new BadRequestException('Passwords do not match');
    }

    if (newPassword && repetedPassword) {
      validatePassword(newPassword, repetedPassword);
    }

    const validateLast = bcrypt.compareSync(lastPassword, currentPassword);

    if (!validateLast) {
      throw new BadRequestException('Last password is incorrect');
    }
  }
}
