import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';

export const cacheManagerConfig: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
    password: configService.get<string>('REDIS_PASSWORD'),
    ttl: configService.get<number>('REDIS_TTL'),
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  }),
};
