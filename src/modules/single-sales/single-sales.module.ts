import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { SingleSalesController } from './single-sales.controller';
import { CreateUseCase } from './use-case/create.usecase';

@Module({
  imports: [SharedModule],
  controllers: [SingleSalesController],
  providers: [CreateUseCase],
  exports: [],
})
export class SingleSalesModule {}
