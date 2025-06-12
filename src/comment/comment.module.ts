import { Module, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentTypeorm } from './comment.entity.typeorm';
import { ICommentRepository } from './interfaces/comment-repository.interface';
import { CommentDrizzleRepository } from './repositores/comment.drizzle.repository';
import { CommentPrismaRepository } from './repositores/comment.prisma.repository';
import { CommentTypeormRepository } from './repositores/comment.typeorm.repository';
import { COMMENT_REPOSITORY } from './comment.constants';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { getOrmRepository } from 'src/common/utils/getOrmRepository';

const useClass = getOrmRepository<ICommentRepository>({
  prisma: CommentPrismaRepository,
  typeorm: CommentTypeormRepository,
  drizzle: CommentDrizzleRepository
});

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([CommentTypeorm]),
    PrismaModule,
  ],
  providers: [
    CommentService, {
      provide: COMMENT_REPOSITORY,
      useClass
    }
  ],
  controllers: [CommentController],
})
export class CommentModule {}
