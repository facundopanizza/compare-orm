import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './entities/user.entity.typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repositores/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeorm])],
  providers: [UserService, UserRepository],
  controllers: [UserController]
})
export class UserModule { }
