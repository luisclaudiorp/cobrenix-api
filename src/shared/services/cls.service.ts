import { AsyncLocalStorage } from 'async_hooks';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClsService {
  public readonly prismaTransaction =
    new AsyncLocalStorage<Prisma.TransactionClient>();
}
