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

  async findOne(boardCommentSeq: number) {
    return await this.repository.findOne({ where: { boardCommentSeq } });
  }

  async findAll(boardSeq: number) {
    return await this.repository.find({
      relations: ['user'],
      where: { boardSeq, status: BoardCommentStatusEnum.ACTIVE },
      order: { createdAt: 'ASC' },
    });
  }

  async createBoardComment(userSeq: number, boardSeq: number, content: string) {
    const boardComment = this.repository.create({ content, userSeq, boardSeq });
    return await this.repository.save(boardComment);
  }

  async deleteBoardComment(boardCommentSeq: number) {
    return await this.repository.update({ boardCommentSeq }, { status: BoardCommentStatusEnum.DELETED });
  }
}
