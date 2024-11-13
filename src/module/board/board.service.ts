import { Injectable } from '@nestjs/common';
import { BoardRepository } from '~/database/repository';
import { BoardResponseDto } from '~/module/board/response';
import { BoardCreateRequestDto, BoardModifyRequestDto } from '~/module/board/request';
import { AuthenticatedUserRequest, TablePageCountRequest } from '~/type/interface';
import { IGetBoardDetail, IGetBoardList } from '~/type/interface/response';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async boardDetail(boardSeq: number) {
    const result = await this.boardRepository.findOne(boardSeq);

    if (!result) {
      throw BoardResponseDto.Fail('게시글이 존재하지 않습니다.');
    }

    const filterResult: IGetBoardDetail = {
      seq: result.boardSeq,
      title: result.title,
      content: result.content,
      createdAt: result.createdAt,
      email: result.user.email,
      name: result.user.name,
    };

    return BoardResponseDto.Success('상세 게시글 조회 성공', filterResult);
  }

  async boardList(query: TablePageCountRequest) {
    const { result, totalCount } = await this.boardRepository.findAllWithWriter(query);

    const filterResult: IGetBoardList[] = result.map((board) => ({
      seq: board.boardSeq,
      title: board.title,
      // content: board.content,
      createdAt: board.createdAt,
      writerName: board.user.name,
    }));

    return BoardResponseDto.Success('게시글 리스트 조회 성공', { list: filterResult, totalCount });
  }

  async boardCreate(req: AuthenticatedUserRequest, body: BoardCreateRequestDto) {
    const { userSeq } = req.user;
    const { title, content } = body;

    if (!userSeq) {
      throw BoardResponseDto.Fail('로그인이 필요합니다.');
    }

    if (!title) {
      throw BoardResponseDto.Fail('제목을 입력해주세요.');
    }

    if (!content) {
      throw BoardResponseDto.Fail('내용을 입력해주세요.');
    }

    const result = await this.boardRepository.createBoard(userSeq, body);

    return BoardResponseDto.Success('게시판 생성 성공', result);
  }

  async boardUpdate(req: AuthenticatedUserRequest, body: BoardModifyRequestDto) {
    const { userSeq } = req.user;
    const { boardSeq, title, content } = body;

    if (!userSeq) {
      throw BoardResponseDto.Fail('로그인이 필요합니다.');
    }

    if (!title) {
      throw BoardResponseDto.Fail('제목을 입력해주세요.');
    }

    if (!content) {
      throw BoardResponseDto.Fail('내용을 입력해주세요.');
    }

    const board = await this.boardRepository.findOne(boardSeq);

    if (!board) {
      throw BoardResponseDto.Fail('게시글이 존재하지 않습니다.');
    }

    if (board.userSeq !== userSeq) {
      throw BoardResponseDto.Fail('게시글 작성자만 수정할 수 있습니다.');
    }

    await this.boardRepository.updateBoard(boardSeq, body);

    return BoardResponseDto.Success('게시글 수정 성공');
  }

  async boardDelete(req: AuthenticatedUserRequest, boardSeq: number) {
    const { userSeq } = req.user;

    if (!userSeq) {
      throw BoardResponseDto.Fail('로그인이 필요합니다.');
    }

    const board = await this.boardRepository.findOne(boardSeq);

    if (!board) {
      throw BoardResponseDto.Fail('게시글이 존재하지 않습니다.');
    }

    if (board.userSeq !== userSeq) {
      throw BoardResponseDto.Fail('게시글 작성자만 삭제할 수 있습니다.');
    }

    await this.boardRepository.deleteBoard(boardSeq);

    return BoardResponseDto.Success('게시글 삭제 성공');
  }
}
