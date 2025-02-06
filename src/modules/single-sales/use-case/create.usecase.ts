import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CreateUseCase {
  logger: Logger;
  constructor() {
    this.logger = new Logger(CreateUseCase.name);
  }

  async execute(data: any) {
    return data;
  }
}
