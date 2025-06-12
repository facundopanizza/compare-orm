import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmRepository } from 'src/common/utils/getOrmRepository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IPostRepository } from './interfaces/post-repository.interface';
import { POST_REPOSITORY } from './post.constants';
import { PostController } from './post.controller';
import { PostTypeorm } from './post.entity.typeorm';
import { PostService } from './post.service';
import { PostDrizzleRepository } from './repositores/post.drizzle.repository';
import { PostPrismaRepository } from './repositores/post.prisma.repository';
import { PostTypeormRepository } from './repositores/post.typeorm.repository';

const useClass = getOrmRepository<IPostRepository>({
  prisma: PostPrismaRepository,
  typeorm: PostTypeormRepository,
  drizzle: PostDrizzleRepository,
});

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([PostTypeorm]),
    PrismaModule,
  ],
  providers: [
    PostService,
    {
      provide: POST_REPOSITORY,
      useClass,
    },
  ],
  controllers: [PostController],
})
export class PostModule {}
