import { Injectable } from '@nestjs/common';
import { BoardRepository } from '~/database/repository';
import { BoardResponseDto } from '~/module/board/response';
import { BoardCreateRequestDto, BoardModifyRequestDto } from '~/module/board/request';
import { AuthenticatedRequest } from '~/type/interface';
import { IGetBoardDetail, IGetBoardList } from '~/type/interface/response';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async boardDetail(req: AuthenticatedRequest, id: number) {
    const {} = req.user;

    const result = await this.boardRepository.findOne(id);

    if (!result) {
      throw BoardResponseDto.Fail('게시글이 존재하지 않습니다.');
    }

    const filterResult: IGetBoardDetail = {
      id: result.id,
      title: result.title,
      content: result.content,
      createdAt: result.createdAt,
      email: result.user.email,
      name: result.user.name,
    };

    return BoardResponseDto.Success('상세 게시글 조회 성공', filterResult);
  }

  async boardList() {
    const result = await this.boardRepository.findAllWithWriter();

    const filterResult: IGetBoardList[] = result.map((board) => ({
      id: board.id,
      title: board.title,
      content: board.content,
      createdAt: board.createdAt,
      writer: board.user.name,
    }));

    return BoardResponseDto.Success('게시글 리스트 조회 성공', filterResult);
  }

  async boardCreate(req: AuthenticatedRequest, body: BoardCreateRequestDto) {
    const { userId } = req.user;
    const { title, content } = body;

    if (!userId) {
      throw BoardResponseDto.Fail('로그인이 필요합니다.');
    }

    if (!title) {
      throw BoardResponseDto.Fail('제목을 입력해주세요.');
    }

    if (!content) {
      throw BoardResponseDto.Fail('내용을 입력해주세요.');
    }

    const result = await this.boardRepository.createBoard(userId, body);

    return BoardResponseDto.Success('게시판 생성 성공', result);
  }

  async boardUpdate(req: AuthenticatedRequest, body: BoardModifyRequestDto) {
    const { userId } = req.user;
    const { id, title, content } = body;

    if (!userId) {
      throw BoardResponseDto.Fail('로그인이 필요합니다.');
    }

    if (!title) {
      throw BoardResponseDto.Fail('제목을 입력해주세요.');
    }

    if (!content) {
      throw BoardResponseDto.Fail('내용을 입력해주세요.');
    }

    const board = await this.boardRepository.findOne(id);

    if (!board) {
      throw BoardResponseDto.Fail('게시글이 존재하지 않습니다.');
    }

    if (board.writer_id !== userId) {
      throw BoardResponseDto.Fail('게시글 작성자만 수정할 수 있습니다.');
    }

    await this.boardRepository.updateBoard(id, body);

    return BoardResponseDto.Success('게시글 수정 성공');
  }

  async boardDelete(req: AuthenticatedRequest, id: number) {
    const { userId } = req.user;

    if (!userId) {
      throw BoardResponseDto.Fail('로그인이 필요합니다.');
    }

    const board = await this.boardRepository.findOne(id);

    if (!board) {
      throw BoardResponseDto.Fail('게시글이 존재하지 않습니다.');
    }

    if (board.writer_id !== userId) {
      throw BoardResponseDto.Fail('게시글 작성자만 삭제할 수 있습니다.');
    }

    await this.boardRepository.deleteBoard(id);

    return BoardResponseDto.Success('게시글 삭제 성공');
  }
}
