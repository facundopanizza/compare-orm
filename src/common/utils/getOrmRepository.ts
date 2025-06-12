import { Type } from '@nestjs/common';
import { OrmType, OrmEnum } from '../config/database.config';

export const getOrmRepository = <T>({
  prisma,
  typeorm,
  drizzle,
}: {
  prisma: Type<T>;
  typeorm: Type<T>;
  drizzle: Type<T>;
}): Type<T> => {
  const orm = process.env.DATABASE_ORM as OrmType;

  switch (orm) {
    case OrmEnum.PRISMA:
      return prisma;
    case OrmEnum.TYPEORM:
      return typeorm;
    case OrmEnum.DRIZZLE:
      return drizzle;
    default:
      throw new Error('Invalid ORM');
  }
};
