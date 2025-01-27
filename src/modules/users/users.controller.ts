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
import { TransactionService } from 'src/shared/services/transaction.service';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { CreateUseCase } from './use-case/create.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUseCase } from './use-case/update.usecase';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUseCase } from './use-case/delete.usecase';
import { FindAllUserDto } from './dto/find-all-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}
  @Get()
  findAll(@Query() query: FindAllUserDto) {
    return this.findAllUseCase.execute(query);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.transactionService.run(() => {
      return this.createUseCase.execute(createUserDto);
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.transactionService.run(() => {
      return this.updateUseCase.execute(Number(id), updateUserDto);
    });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.transactionService.run(() => {
      return this.deleteUseCase.execute(Number(id));
    });
  }
}
