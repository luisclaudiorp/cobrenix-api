import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './repository/products.repository';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { CreateUseCase } from './use-case/create.usecase';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [SharedModule, CompaniesModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    FindAllUseCase,
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
