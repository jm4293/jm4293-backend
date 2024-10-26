import { Injectable } from '@nestjs/common';
import { BoardModel } from '../../model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardCreateRequestDto } from '~/module/board/request';
import { BoardStatusEnum } from '~/type/enum/board';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(BoardModel)
    private readonly repository: Repository<BoardModel>,
  ) {}

  async findOne(seq: number) {
    return await this.repository.findOne({ where: { seq, status: BoardStatusEnum.ACTIVE }, relations: ['user'] });
  }

  async findAllWithWriter() {
    return await this.repository.find({
      where: { status: BoardStatusEnum.ACTIVE },
      relations: ['user'],
      order: { seq: 'DESC' },
    });
  }

  async createBoard(user_seq: number, body: BoardCreateRequestDto) {
    const board = this.repository.create({ ...body, writer_seq: user_seq });
    return await this.repository.save(board);
  }

  async updateBoard(seq: number, body: BoardCreateRequestDto) {
    return await this.repository.update({ seq }, body);
  }

  async deleteBoard(seq: number) {
    return await this.repository.update({ seq }, { status: BoardStatusEnum.DELETED });
  }
}
