import { Module } from '@nestjs/common';
import { BoardCommentController } from './board-comment.controller';
import { BoardCommentService } from './board-comment.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from '~/config';
import { DatabaseModule } from '~/database/database.module';

@Module({
  imports: [DatabaseModule, JwtModule.registerAsync(jwtModuleConfig)],
  controllers: [BoardCommentController],
  providers: [BoardCommentService],
})
export class BoardCommentModule {}
