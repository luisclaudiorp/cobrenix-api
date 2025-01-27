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
import { FindAllCompaniesDto } from './dto/find-all-companies.dto';
import { TransactionService } from 'src/shared/services/transaction.service';
import { CreateCompaniesDto } from './dto/create-companies.dto';
import { CreateUseCase } from './use-case/create.usecase';
import { UpdateCompaniesDto } from './dto/update-companies.dto';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}

  @Get()
  async findAll(@Query() query: FindAllCompaniesDto) {
    return this.findAllUseCase.execute(query);
  }

  @Post()
  create(@Body() createCompaniesDto: CreateCompaniesDto) {
    return this.transactionService.run(() =>
      this.createUseCase.execute(createCompaniesDto),
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompaniesDto: UpdateCompaniesDto,
  ) {
    return this.transactionService.run(() =>
      this.updateUseCase.execute(Number(id), updateCompaniesDto),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionService.run(() =>
      this.deleteUseCase.execute(Number(id)),
    );
  }
}
