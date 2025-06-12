import { Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig, { OrmEnum, OrmType } from 'src/common/config/database.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserTypeorm } from './entities/user.entity.typeorm';
import { IUserRepository } from './interfaces/user-repository.interface';
import { UserDrizzleRepository } from './repositores/user.drizzle.repository';
import { UserPrismaRepository } from './repositores/user.prisma.repository';
import { UserTypeOrmRepository } from './repositores/user.typeorm.repository';
import { USER_REPOSITORY } from './user.constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getOrmRepository } from 'src/common/utils/getOrmRepository';

const useClass = getOrmRepository<IUserRepository>({
  prisma: UserPrismaRepository,
  typeorm: UserTypeOrmRepository,
  drizzle: UserDrizzleRepository
});

@Module({
  imports: [
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forFeature([UserTypeorm]),
    PrismaModule,
  ],
  providers: [
    UserService, {
      provide: USER_REPOSITORY,
      useClass
    }],
  controllers: [UserController]
})
export class UserModule { }
