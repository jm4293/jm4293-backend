import { Module } from '@nestjs/common';
import { ChattingGateway } from '~/module/chatting/chatting.gateway';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from '~/config';
import { DatabaseModule } from '~/database';

@Module({
  imports: [DatabaseModule, JwtModule.registerAsync(jwtModuleConfig)],
  providers: [ChattingGateway],
})
export class ChattingModule {}
