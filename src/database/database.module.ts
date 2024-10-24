import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCommentModel, BoardModel, UserModel } from '~/database/model';
import { BoardCommentRepository, BoardRepository, UserRepository } from '~/database/repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, BoardModel, BoardCommentModel])],
  providers: [UserRepository, BoardRepository, BoardCommentRepository],
  exports: [UserRepository, BoardRepository, BoardCommentRepository],
})
export class DatabaseModule {}
