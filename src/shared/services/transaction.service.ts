import type { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { ClsService } from './cls.service';

@Injectable()
export class TransactionService {
  public constructor(
    private prismaService: PrismaService,
    private clsService: ClsService,
  ) {}

  async run<T>(fn: () => Promise<T>) {
    const prisma = this.prismaService.getClient() as PrismaClient;

    const isPrismaTransactionClient = prisma['_transactionId'] !== undefined;

    /**
     * If already has a open transaction in the context,
     * uses it instead of creating a new one
     */
    if (isPrismaTransactionClient) {
      return fn();
    }

    return prisma.$transaction(
      async (prisma) => {
        this.clsService.prismaTransaction.enterWith(prisma);

        try {
          return await fn();
        } catch (error) {
          this.clsService.prismaTransaction.disable();
          throw error;
        }
      },
      {
        timeout: Number(process.env.PRISMA_TIMEOUT) || 10000,
        maxWait: Number(process.env.PRISMA_MAX_WAIT) || 2000,
      },
    );
  }
}
