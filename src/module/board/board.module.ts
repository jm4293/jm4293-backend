import { Module } from '@nestjs/common';
import { DatabaseModule } from '~/database';
import { BoardController } from '~/module/board/board.controller';
import { BoardService } from '~/module/board/board.service';
import { AuthModule } from '~/module/auth';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
