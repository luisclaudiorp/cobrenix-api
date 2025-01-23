import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../users.service';
import { hashPassword, validatePassword } from 'src/shared/utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUseCase {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UpdateUseCase.name);
  }

  async execute(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { password, repetedPassword, lastPassword, ...rest } =
        updateUserDto;
      this.logger.log('updateUserDto', rest);

      const foundUser = await this.userService.findById(id);

      if (!foundUser) {
        throw new NotFoundException('User not found');
      }

      if (lastPassword) {
        this.verifyPassword(
          lastPassword,
          foundUser.password,
          password,
          repetedPassword,
        );
      }

      if (rest.email) {
        const userByEmail = await this.userService.findByEmail(rest.email);

        if (userByEmail && userByEmail.id !== id) {
          throw new BadRequestException('User already exists');
        }
      }

      const userToUpdate = {
        name: rest.name,
        email: rest.email,
        password: password && hashPassword(password),
      };

      this.logger.warn('Error to update new user', userToUpdate);

      return await this.userService.update(id, userToUpdate);
    } catch (error) {
      this.logger.warn('Error to update new user', error);
      throw error;
    }
  }

  private verifyPassword(
    lastPassword: string,
    foundUserPassword: string,
    password: string,
    repetedPassword: string,
  ) {
    if ((password && !repetedPassword) || (!password && repetedPassword)) {
      throw new BadRequestException('Passwords do not match');
    }

    if (password && repetedPassword) {
      validatePassword(password, repetedPassword);
    }

    const validateLast = bcrypt.compareSync(lastPassword, foundUserPassword);

    if (!validateLast) {
      throw new BadRequestException('Last password is incorrect');
    }
  }
}
