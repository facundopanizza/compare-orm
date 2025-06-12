import { DrizzleBetterSQLiteModule } from '@knaadh/nestjs-drizzle-better-sqlite3';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as schema from '../drizzle/schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './common/config/database.config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (configuration: ConfigType<typeof databaseConfig>) => ({
        type: 'sqlite',
        database: configuration.path,
        entities: [__dirname + '/user/entities/user.entity.typeorm.{js,ts}'],
      }),
    }),
    DrizzleBetterSQLiteModule.registerAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (configuration: ConfigType<typeof databaseConfig>) => ({
        sqlite3: {
          filename: configuration.path.split('file:')[1],
        },
        config: { schema: { ...schema } },
      }),
    }),
    UserModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
