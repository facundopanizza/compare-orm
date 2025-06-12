import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle/output',
    schema: './drizzle/schema.ts',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DATABASE_PATH!,
    },
});
