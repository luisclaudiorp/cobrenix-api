import { LoggerService } from '@nestjs/common';

export class LoggerApiService implements LoggerService {
  private logger: LoggerService;
  constructor(wrappedLogger: LoggerService) {
    this.logger = wrappedLogger;
  }
  log(message: any, data?: any) {
    this.logger.log(message, data);
  }
  error(message: any, stack?: string, data?: any) {
    this.logger.error(message, stack, data);
  }
  warn(message: any, data: any) {
    this.logger.warn(message, data);
  }
  debug?(message: any, data: any) {
    if (this.logger.debug) {
      this.logger.debug(message, data);
    }
  }
  verbose?(message: any, data: any) {
    if (this.logger.verbose) {
      this.logger.verbose(message, data);
    }
  }
}
