import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { TransactionService } from "src/shared/services/transaction.service";
import { FindAllUseCase } from "./use-case/find-all.usecase";
import { CreateUseCase } from "./use-case/create.usecase";
import { UpdateUseCase } from "./use-case/update.usecase";
import { DeleteUseCase } from "./use-case/delete.usecase";
import { FindAllProductsDto } from "./dto/find-all-products.dto";
import { CreateProductsDto } from "./dto/create-products.dto";
import { UpdateProductsDto } from "./dto/update-products.dto";

@Controller('products')
export class ProductsController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
  ) {}

  @Get()
  async findAll(@Query() query: FindAllProductsDto) {
    return this.findAllUseCase.execute(query);
  }

  @Post()
  create(@Body() createProductsDto: CreateProductsDto) {
    return this.transactionService.run(() =>
      this.createUseCase.execute(createProductsDto),
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductsDto: UpdateProductsDto,
  ) {
    return this.transactionService.run(() =>
      this.updateUseCase.execute(Number(id), updateProductsDto),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.transactionService.run(() =>
      this.deleteUseCase.execute(Number(id)),
    );
  }
}