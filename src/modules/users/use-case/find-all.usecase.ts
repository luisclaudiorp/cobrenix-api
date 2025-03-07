import { Injectable, Logger } from '@nestjs/common';
import { FindAllUserDto } from '../dto/find-all-user.dto';
import { UserService } from '../users.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FindAllUseCase {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(FindAllUseCase.name);
  }
  async execute(query: FindAllUserDto) {
    try {
      const data = this.createQuery(query);
      return await this.userService.findAll(data);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  private createQuery(query: FindAllUserDto): Prisma.UsersWhereInput {
    const { name, email, id, active } = query;

    const where = {} as Prisma.UsersWhereInput;

    if (name) {
      where.name = { contains: name, mode: 'insensitive' };
    }

    if (email) {
      where.email = { equals: email };
    }

    if (id) {
      where.id = { equals: id };
    }

    if (active == undefined) {
      where.active = { equals: true };
    } else {
      where.active = { equals: active };
    }

    this.logger.log('findAll', { where });
    return where;
  }
}
