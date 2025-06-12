import { Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagTypeorm } from './tag.entity.typeorm';
import { ITagRepository } from './interfaces/tag-repository.interface';
import { TagDrizzleRepository } from './repositores/tag.drizzle.repository';
import { TagPrismaRepository } from './repositores/tag.prisma.repository';
import { TagTypeormRepository } from './repositores/tag.typeorm.repository';
import { TAG_REPOSITORY } from './tag.constants';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { getOrmRepository } from 'src/common/utils/getOrmRepository';

const useClass = getOrmRepository<ITagRepository>({
  prisma: TagPrismaRepository,
  typeorm: TagTypeormRepository,
  drizzle: TagDrizzleRepository
});

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([TagTypeorm]),
    PrismaModule,
  ],
  providers: [
    TagService, {
      provide: TAG_REPOSITORY,
      useClass
    }
  ],
  controllers: [TagController],
})
export class TagModule {}
