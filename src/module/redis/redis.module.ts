import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisConfig } from '~/config';

@Module({
  imports: [ConfigModule],
  providers: [redisConfig],
  exports: [redisConfig],
})
export class RedisModule {}
