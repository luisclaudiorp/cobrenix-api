import { Delete, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersRepository } from './repository/customers.repository';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { CreateUseCase } from './use-case/create.usecase';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [SharedModule, CompaniesModule],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    CustomersRepository,
    FindAllUseCase,
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
