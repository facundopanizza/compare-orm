import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'file:local.db',
    entities: ['src/**/*.entity.typeorm.{js,ts}'],
    migrations: ['typeorm-migrations/*.{js,ts}'],
});
