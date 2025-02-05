import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CustomersService } from '../customers.service';
import { CreateCustomersDto } from '../dto/create-customers.dto';
import { CompaniesService } from 'src/modules/companies/companies.service';
import { hashPassword, validatePassword } from 'src/shared/utils';

@Injectable()
export class CreateUseCase {
  logger: Logger;
  constructor(
    private readonly customersService: CustomersService,
    private readonly companiesService: CompaniesService,
  ) {
    this.logger = new Logger(CreateUseCase.name);
  }
  async execute(createCustomersDto: CreateCustomersDto) {
    try {
      const { password, repetedPassword, name, email, companyId } =
        createCustomersDto;
      this.logger.log('createCustomersDto', createCustomersDto);

      validatePassword(password, repetedPassword);

      const foundCustomer = await this.customersService.findByEmail(email);

      if (foundCustomer) {
        throw new BadRequestException('Customer already exists');
      }

      const foundCompany = await this.companiesService.findById(companyId);

      if (!foundCompany) {
        throw new BadRequestException('Company not found');
      }

      return await this.customersService.create({
        name,
        email,
        password: hashPassword(password),
        companyId,
      });
    } catch (error) {
      this.logger.warn('Error to create new customer', error);
      throw error;
    }
  }
}
