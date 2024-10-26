import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardCommentModel } from '~/database/model';
import { BoardCommentStatusEnum } from '~/type/enum/board-comment';

@Injectable()
export class BoardCommentRepository {
  constructor(
    @InjectRepository(BoardCommentModel)
    private readonly repository: Repository<BoardCommentModel>,
  ) {}

  async findOne(seq: number) {
    return await this.repository.findOne({ where: { seq } });
  }

  async findAll(board_seq: number) {
    return await this.repository.find({
      relations: ['user'],
      where: { board_seq, status: BoardCommentStatusEnum.ACTIVE },
    });
  }

  async createBoardComment(user_seq: number, board_seq: number, content: string) {
    const boardComment = this.repository.create({ content, user_seq, board_seq });
    return await this.repository.save(boardComment);
  }

  async deleteBoardComment(seq: number) {
    return await this.repository.update({ seq }, { status: BoardCommentStatusEnum.DELETED });
  }
}
