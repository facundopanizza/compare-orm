import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync, IsString, IsNotEmpty, IsEnum } from 'class-validator';

export const OrmEnum = {
  TYPEORM: 'typeorm',
  PRISMA: 'prisma',
  DRIZZLE: 'drizzle',
};

export type OrmType = keyof typeof OrmEnum;

class DatabaseConfigDto {
  @IsString()
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  @IsEnum(OrmEnum)
  orm: keyof typeof OrmEnum;
}

function validateDatabaseConfig(config: Record<string, any>) {
  const instance = plainToInstance(DatabaseConfigDto, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(instance, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });
  if (errors.length > 0) {
    throw new Error(
      'Database config validation error: ' +
        errors
          .map((e) => Object.values(e.constraints || {}).join(', '))
          .join('; '),
    );
  }
  return instance;
}

export default registerAs('database', () => {
  const config = {
    path: process.env.DATABASE_PATH,
    orm: process.env.DATABASE_ORM,
  };

  return validateDatabaseConfig(config);
});
