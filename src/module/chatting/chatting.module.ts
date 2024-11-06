import { Module } from '@nestjs/common';
import { ChattingGateway } from '~/module/chatting/chatting.gateway';

@Module({
  providers: [ChattingGateway],
})
export class ChattingModule {}
