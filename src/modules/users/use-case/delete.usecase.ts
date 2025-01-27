import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserService } from '../users.service';

@Injectable()
export class DeleteUseCase {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(DeleteUseCase.name);
  }
  async execute(id: number) {
    try {
      this.logger.log('Delete user', id);

      const foundUser = await this.userService.findById(id);

      if (!foundUser) {
        throw new NotFoundException('User not found');
      }

      return await this.userService.update(id, { active: false });
    } catch (error) {
      this.logger.warn('Error to delete user', error);
      throw error;
    }
  }
}
