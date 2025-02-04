import { Delete, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './repository/customers.repository';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { CreateUseCase } from './use-case/create.usecase';
import { CompaniesService } from '../companies/companies.service';
import { CompaniesRepository } from '../companies/repository/companies.respository';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';

@Module({
  imports: [SharedModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomersRepository,
    FindAllUseCase,
    CreateUseCase,
    CompaniesService,
    CompaniesRepository,
    UpdateUseCase,
    DeleteUseCase,
  ],
  exports: [],
})
export class CustomersModule {}
