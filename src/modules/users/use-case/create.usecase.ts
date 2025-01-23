import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../users.service';
import { hashPassword, validatePassword } from 'src/shared/utils';

@Injectable()
export class CreateUseCase {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(CreateUseCase.name);
  }

  async execute(createUserDto: CreateUserDto) {
    try {
      const { password, repetedPassword, ...rest } = createUserDto;
      this.logger.log('createUserDto', rest);

      validatePassword(password, repetedPassword);

      const foundUser = await this.userService.findByEmail(rest.email);

      if (foundUser) {
        throw new BadRequestException('User already exists');
      }

      return await this.userService.create({
        name: rest.name,
        email: rest.email,
        password: hashPassword(password),
      });
    } catch (error) {
      this.logger.warn('Error to create new user', error);
      throw error;
    }
  }
}
