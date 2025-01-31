import { Injectable } from '@nestjs/common';
import { UserRespository } from './repository/user.respository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRespository: UserRespository) {}

  async findById(id: number) {
    return await this.userRespository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.userRespository.findByEmail(email);
  }

  async findAll(query: Prisma.UsersWhereInput) {
    return await this.userRespository.findAll(query);
  }

  async create(data: Prisma.UsersCreateInput) {
    return this.userRespository.create(data);
  }

  async update(id: number, data: Prisma.UsersUpdateInput) {
    return this.userRespository.update(id, data);
  }

  async delete(id: number) {
    return this.userRespository.delete(id);
  }
}
