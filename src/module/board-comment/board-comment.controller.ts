import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/common/guard';
import { AuthenticatedUserRequest } from '~/type/interface';
import { BoardCommentCreateRequestDto } from '~/module/board-comment/request';
import { BoardCommentService } from '~/module/board-comment/board-comment.service';

@Controller('board-comment')
export class BoardCommentController {
  constructor(private readonly boardCommentService: BoardCommentService) {}

  @ApiOperation({ summary: '게시글 댓글 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get('board-comment-list/:boardSeq')
  async boardCommentList(@Param('boardSeq') boardSeq: number) {
    try {
      return this.boardCommentService.boardCommentList(boardSeq);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 댓글 작성' })
  @UseGuards(JwtAuthGuard)
  @Post('board-comment-create')
  async boardCommentCreate(@Req() req: AuthenticatedUserRequest, @Body() body: BoardCommentCreateRequestDto) {
    try {
      return this.boardCommentService.boardCommentCreate(req, body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 댓글 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete('board-comment-delete/:boardCommentSeq')
  async boardCommentDelete(@Req() req: AuthenticatedUserRequest, @Param('boardCommentSeq') boardCommentSeq: number) {
    try {
      return this.boardCommentService.boardCommentDelete(req, boardCommentSeq);
    } catch (e) {
      return e;
    }
  }
}
