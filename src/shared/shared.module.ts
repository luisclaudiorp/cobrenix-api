import { Module } from '@nestjs/common';
import { ClsService } from './services/cls.service';
import { PrismaService } from './services/prisma.service';
import { TransactionService } from './services/transaction.service';
import { LoggerApiService } from './services/logger.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ClsService, PrismaService, TransactionService, LoggerApiService],
  exports: [ClsService, PrismaService, TransactionService, LoggerApiService],
})
export class SharedModule {}
