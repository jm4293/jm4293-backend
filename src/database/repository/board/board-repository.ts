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

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id, status: BoardStatusEnum.ACTIVE }, relations: ['user'] });
  }

  async findAllWithWriter() {
    return await this.repository.find({
      where: { status: BoardStatusEnum.ACTIVE },
      relations: ['user'],
      order: { id: 'DESC' },
    });
  }

  async createBoard(userId: number, body: BoardCreateRequestDto) {
    const board = this.repository.create({ ...body, writer_id: userId });
    return await this.repository.save(board);
  }

  async updateBoard(id: number, body: BoardCreateRequestDto) {
    return await this.repository.update({ id }, body);
  }

  async deleteBoard(id: number) {
    return await this.repository.update({ id }, { status: BoardStatusEnum.DELETED });
  }
}
