import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionService } from 'src/shared/services/transaction.service';
import { CreateSingleSalesDto } from './dto/create-single-sales.dto';
import { CreateUseCase } from './use-case/create.usecase';
import { FindAllSingleSalesDto } from './dto/find-all-single-sales.dto';
import { FindAllUseCase } from './use-case/find-all.usecase';

@Controller('single-sales')
export class SingleSalesController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly createUseCase: CreateUseCase,
    private readonly findAllUseCase: FindAllUseCase,
  ) {}

  @Get()
  async findAll(@Query() query: FindAllSingleSalesDto) {
    return this.findAllUseCase.execute(query);
  }

  @Post()
  create(@Body() createSingleSalesDto: CreateSingleSalesDto) {
    return this.transactionService.run(() =>
      this.createUseCase.execute(createSingleSalesDto),
    );
  }
}
