import { DataSource } from 'typeorm';
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: process.env.DATABASE_PATH ?? "",
    entities: ['src/**/*.entity.typeorm.{js,ts}'],
    migrations: ['typeorm-migrations/*.{js,ts}'],
});
