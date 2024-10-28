import { Injectable } from '@nestjs/common';
import { BoardModel } from '../../model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardCreateRequestDto } from '~/module/board/request';
import { BoardStatusEnum } from '~/type/enum/board';
import { TablePageCountRequest } from '~/type/interface';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(BoardModel)
    private readonly repository: Repository<BoardModel>,
  ) {}

  async findOne(seq: number) {
    return await this.repository.findOne({ where: { seq, status: BoardStatusEnum.ACTIVE }, relations: ['user'] });
  }

  async findAllWithWriter(query: TablePageCountRequest) {
    const { page, count } = query;

    const [result, totalCount] = await this.repository.findAndCount({
      where: { status: BoardStatusEnum.ACTIVE },
      relations: ['user'],
      skip: (page - 1) * count,
      take: count,
      order: { seq: 'DESC' },
    });

    return { result, totalCount };
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
