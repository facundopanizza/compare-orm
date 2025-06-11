import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from './entities/user.entity.typeorm';
import { UserPrismaRepository } from './repositores/user.prisma.repository';
import { USER_REPOSITORY } from './user.constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserTypeOrmRepository } from './repositores/user.typeorm.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeorm]), PrismaModule],
  providers: [UserService, { provide: USER_REPOSITORY, useClass: UserPrismaRepository }],
  controllers: [UserController]
})
export class UserModule { }
