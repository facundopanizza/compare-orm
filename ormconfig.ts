import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'local.db',
    entities: ['src/**/*.entity.typeorm.{js,ts}'],
    migrations: ['src/typeorm-migrations/*.{js,ts}'],
    synchronize: false,
});
