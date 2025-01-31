import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repository/products.repository';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { CreateUseCase } from './use-case/create.usecase';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';
import { CompaniesService } from '../companies/companies.service';
import { CompaniesRepository } from '../companies/repository/companies.respository';

@Module({
  imports: [SharedModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    FindAllUseCase,
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    CompaniesService,
    CompaniesRepository,
  ],
  exports: [],
})
export class ProductsModule {}
