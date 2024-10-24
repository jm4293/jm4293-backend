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

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(id: number) {
    return await this.repository.find({
      relations: ['user'],
      where: { board_id: id, status: BoardCommentStatusEnum.ACTIVE },
    });
  }

  async createBoardComment(userId: number, boardId: number, content: string) {
    const boardComment = this.repository.create({ content, user_id: userId, board_id: boardId });
    return await this.repository.save(boardComment);
  }

  async deleteBoardComment(id: number) {
    return await this.repository.update({ id }, { status: BoardCommentStatusEnum.DELETED });
  }
}
