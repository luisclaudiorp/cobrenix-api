import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { SingleSalesController } from './single-sales.controller';
import { CreateUseCase } from './use-case/create.usecase';
import { CompaniesModule } from '../companies/companies.module';
import { CustomersModule } from '../customers/customers.module';
import { ProductsModule } from '../products/products.module';
import { SingleSalesService } from './single-sales.service';
import { SingleSalesRepository } from './repository/single-sales.repository';
import { FindAllUseCase } from './use-case/find-all.usecase';

@Module({
  imports: [SharedModule, CompaniesModule, CustomersModule, ProductsModule],
  controllers: [SingleSalesController],
  providers: [
    CreateUseCase,
    FindAllUseCase,
    SingleSalesService,
    SingleSalesRepository,
  ],
  exports: [],
})
export class SingleSalesModule {}
