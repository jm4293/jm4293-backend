import { Module } from '@nestjs/common';
import { ChattingGateway } from '~/module/chatting/chatting.gateway';
import { JwtModule } from '@nestjs/jwt';
import { cacheManagerConfig, jwtModuleConfig } from '~/config';
import { DatabaseModule } from '~/database';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [DatabaseModule, JwtModule.registerAsync(jwtModuleConfig), CacheModule.registerAsync(cacheManagerConfig)],
  providers: [ChattingGateway],
})
export class ChattingModule {}
