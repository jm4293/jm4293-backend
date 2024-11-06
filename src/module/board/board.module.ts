import { Module } from '@nestjs/common';
import { BoardController } from '~/module/board/board.controller';
import { BoardService } from '~/module/board/board.service';
import { DatabaseModule } from '~/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from '~/config';

@Module({
  imports: [DatabaseModule, JwtModule.registerAsync(jwtModuleConfig)],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
