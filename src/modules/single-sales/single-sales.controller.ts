import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from 'src/shared/services/transaction.service';
import { CreateSingleSalesDto } from './dto/create-single-sales.dto';
import { CreateUseCase } from './use-case/create.usecase';

@Controller('single-sales')
export class SingleSalesController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly createUseCase: CreateUseCase,
  ) {}

  @Post()
  create(@Body() createSingleSalesDto: CreateSingleSalesDto) {
    return this.transactionService.run(() =>
      this.createUseCase.execute(createSingleSalesDto),
    );
  }
}
