import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCommentModel, BoardModel, ChattingModel, UserModel } from '~/database/model';
import { BoardCommentRepository, BoardRepository, UserRepository } from '~/database/repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, BoardModel, BoardCommentModel, ChattingModel])],
  providers: [UserRepository, BoardRepository, BoardCommentRepository, ChattingModel],
  exports: [UserRepository, BoardRepository, BoardCommentRepository, ChattingModel],
})
export class DatabaseModule {}
