import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TransactionService } from 'src/shared/services/transaction.service';
import { CreateSingleSalesDto } from './dto/create-single-sales.dto';
import { CreateUseCase } from './use-case/create.usecase';
import { FindAllSingleSalesDto } from './dto/find-all-single-sales.dto';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { UpdateUseCase } from './use-case/update.usecase';
import { UpdateSingleSalesDto } from './dto/update.single-sales.dto';

@Controller('single-sales')
export class SingleSalesController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly createUseCase: CreateUseCase,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly updateUseCase: UpdateUseCase,
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

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSingleSalesDto: UpdateSingleSalesDto,
  ) {
    return this.transactionService.run(() =>
      this.updateUseCase.execute(Number(id), updateSingleSalesDto),
    );
  }
}
