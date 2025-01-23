import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const validatePassword = (password: string, repetedPassword: string) => {
  if (password !== repetedPassword) {
    throw new BadRequestException('Passwords do not match');
  }
};

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  return password;
};
