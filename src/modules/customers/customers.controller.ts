import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { FindAllCustomersDto } from './dto/find-all-customers.dto';
import { CreateCustomersDto } from './dto/create-customers.dto';
import { TransactionService } from 'src/shared/services/transaction.service';
import { CreateUseCase } from './use-case/create.usecase';
import { UpdateCustomersDto } from './dto/update-customers.dto';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly findAllUseCase: FindAllUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly transactionService: TransactionService,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}

  @Get()
  async findAll(@Query() query: FindAllCustomersDto) {
    return this.findAllUseCase.execute(query);
  }

  @Post()
  create(@Body() CreateCustomersDto: CreateCustomersDto) {
    return this.transactionService.run(() =>
      this.createUseCase.execute(CreateCustomersDto),
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomersDto: UpdateCustomersDto,
  ) {
    return this.transactionService.run(() =>
      this.updateUseCase.execute(Number(id), updateCustomersDto),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionService.run(() =>
      this.deleteUseCase.execute(Number(id)),
    );
  }
}
