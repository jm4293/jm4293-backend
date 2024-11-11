import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChattingModel } from '~/database/model';
import { Repository } from 'typeorm';
import { ChattingCreateRequestDto } from '~/module/chatting/request';

@Injectable()
export class ChattingRepository {
  constructor(
    @InjectRepository(ChattingModel)
    private readonly repository: Repository<ChattingModel>,
  ) {}

  async createChatting(userSeq: number, body: ChattingCreateRequestDto) {
    const chatting = this.repository.create({ userSeq, ...body });
    return await this.repository.save(chatting);
  }
}
