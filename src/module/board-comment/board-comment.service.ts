import { Injectable } from '@nestjs/common';
import { BoardCommentRepository } from '~/database/repository';
import { AuthenticatedRequest } from '~/type/interface';
import { BoardCommentCreateRequestDto } from '~/module/board-comment/request';
import { BoardCommentResponseDto } from '~/module/board-comment/response';

@Injectable()
export class BoardCommentService {
  constructor(private readonly boardCommentRepository: BoardCommentRepository) {}

  async boardCommentList(id: number) {
    const result = await this.boardCommentRepository.findAll(id);

    const filterResult = result.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      email: comment.user.email,
      name: comment.user.name,
    }));

    return BoardCommentResponseDto.Success('게시글 댓글 조회 성공', filterResult);
  }

  async boardCommentCreate(req: AuthenticatedRequest, body: BoardCommentCreateRequestDto) {
    const { userId } = req.user;
    const { content, boardId } = body;

    if (!userId) {
      throw BoardCommentResponseDto.Fail('로그인이 필요합니다.');
    }

    if (!boardId) {
      throw BoardCommentResponseDto.Fail('없는 게시글입니다.');
    }

    if (!content) {
      throw BoardCommentResponseDto.Fail('내용을 입력해주세요.');
    }

    const result = this.boardCommentRepository.createBoardComment(userId, boardId, content);

    return BoardCommentResponseDto.Success('게시글 댓글 작성 성공', result);
  }

  async boardCommentDelete(req: AuthenticatedRequest, id: number) {
    const { userId } = req.user;

    const boardComment = await this.boardCommentRepository.findOne(id);

    if (!boardComment) {
      throw BoardCommentResponseDto.Fail('없는 댓글입니다.');
    }

    if (boardComment.user_id !== userId) {
      throw BoardCommentResponseDto.Fail('본인의 댓글만 삭제할 수 있습니다.');
    }

    await this.boardCommentRepository.deleteBoardComment(id);

    return BoardCommentResponseDto.Success('게시글 댓글 삭제 성공');
  }
}
