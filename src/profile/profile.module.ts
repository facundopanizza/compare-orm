import { Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileTypeorm } from './profile.entity.typeorm';
import { IProfileRepository } from './interfaces/profile-repository.interface';
import { ProfileDrizzleRepository } from './repositores/profile.drizzle.repository';
import { ProfilePrismaRepository } from './repositores/profile.prisma.repository';
import { ProfileTypeormRepository } from './repositores/profile.typeorm.repository';
import { PROFILE_REPOSITORY } from './profile.constants';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { getOrmRepository } from 'src/common/utils/getOrmRepository';

const useClass = getOrmRepository<IProfileRepository>({
  prisma: ProfilePrismaRepository,
  typeorm: ProfileTypeormRepository,
  drizzle: ProfileDrizzleRepository,
});

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ProfileTypeorm]),
    PrismaModule,
  ],
  providers: [
    ProfileService,
    {
      provide: PROFILE_REPOSITORY,
      useClass,
    },
  ],
  controllers: [ProfileController],
})
export class ProfileModule {}
