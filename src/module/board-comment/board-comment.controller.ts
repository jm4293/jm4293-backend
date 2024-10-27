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
  @Get('board-comment-list/:board_seq')
  async boardCommentList(@Param('board_seq') board_seq: number) {
    try {
      return this.boardCommentService.boardCommentList(board_seq);
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
  @Delete('board-comment-delete/:seq')
  async boardCommentDelete(@Req() req: AuthenticatedUserRequest, @Param('seq') seq: number) {
    try {
      return this.boardCommentService.boardCommentDelete(req, seq);
    } catch (e) {
      return e;
    }
  }
}
