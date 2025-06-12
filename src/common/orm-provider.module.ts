import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import databaseConfig, { OrmEnum } from './config/database.config';

/**
 * Helper to create a configurable ORM provider for repositories.
 * Usage:
 * OrmProviderModule.forRepository(USER_REPOSITORY, {
 *   [OrmEnum.PRISMA]: UserPrismaRepository,
 *   [OrmEnum.TYPEORM]: UserTypeOrmRepository,
 *   // [OrmEnum.DRIZZLE]: UserDrizzleRepository,
 * })
 */
@Module({})
export class OrmProviderModule {
    static forRepository(token: string | symbol, repoMap: Record<string, any>, extraImports: any[] = []): DynamicModule {
        const provider: Provider = {
            provide: token,
            inject: [databaseConfig.KEY, ...(Object.values(repoMap))],
            useFactory: (config: ConfigType<typeof databaseConfig>, ...repos: any[]) => {
                const repoClass = repoMap[config.orm];
                if (!repoClass) throw new Error(`Unsupported ORM: ${config.orm}`);
                // Find matching instance from injected repos
                const instance = repos.find(r => r instanceof repoClass);
                if (instance) return instance;
                // Or instantiate if not already
                return new repoClass(...repos);
            }
        };
        const repoProviders = Object.values(repoMap).map(repoClass => ({ provide: repoClass, useClass: repoClass }));
        return {
            module: OrmProviderModule,
            imports: [ConfigModule.forFeature(databaseConfig), ...extraImports],
            providers: [provider, ...repoProviders],
            exports: [provider],
        };
    }
}
