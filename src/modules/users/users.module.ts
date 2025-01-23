import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FindAllUseCase } from './use-case/find-all.usecase';
import { SharedModule } from 'src/shared/shared.module';
import { CreateUseCase } from './use-case/create.usecase';
import { UpdateUseCase } from './use-case/update.usecase';
import { DeleteUseCase } from './use-case/delete.usecase';
import { UserService } from './users.service';
import { UserRespository } from './repository/user.respository';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [
    FindAllUseCase,
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    UserService,
    UserRespository,
  ],
  exports: [],
})
export class UsersModule {}
