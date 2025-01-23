import { createPrismaQueryEventHandler } from 'prisma-query-log';
import { PrismaClient } from '@prisma/client';
import { ClsService } from './cls.service';
import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger;
  private readonly prisma: PrismaClient;

  constructor(private clsService: ClsService) {
    this.logger = new Logger(PrismaService.name);
    this.prisma = new PrismaClient({
      log: [
        {
          level: 'query',
          emit: 'event',
        },
      ],
    });
  }

  onModuleInit() {
    const log = createPrismaQueryEventHandler({
      logger: (query) => this.logger.debug(query),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.prisma.$on('query', log);

    return this.prisma.$connect();
  }

  onModuleDestroy() {
    if (this.prisma) {
      this.prisma.$disconnect();
    }
  }

  getClient() {
    const prisma = this.clsService.prismaTransaction.getStore();

    return prisma || this.prisma;
  }
}
