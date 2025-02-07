import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './repository/companies.respository';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { SharedModule } from 'src/shared/shared.module';
import { CreateUseCase } from './use-case/create.usecase';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';

@Module({
  imports: [SharedModule],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    CompaniesRepository,
    FindAllUseCase,
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
  ],
  exports: [CompaniesService],
})
export class CompaniesModule {}
