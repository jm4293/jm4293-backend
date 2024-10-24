import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/common/guard';
import { AuthenticatedRequest } from '~/type/interface';
import { BoardCommentCreateRequestDto } from '~/module/board-comment/request';
import { BoardCommentService } from '~/module/board-comment/board-comment.service';

@Controller('board-comment')
export class BoardCommentController {
  constructor(private readonly boardCommentService: BoardCommentService) {}

  @ApiOperation({ summary: '게시글 댓글 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get('board-comment-list/:id')
  async boardCommentList(@Param('id') id: number) {
    try {
      return this.boardCommentService.boardCommentList(id);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 댓글 작성' })
  @UseGuards(JwtAuthGuard)
  @Post('board-comment-create')
  async boardCommentCreate(@Req() req: AuthenticatedRequest, @Body() body: BoardCommentCreateRequestDto) {
    try {
      return this.boardCommentService.boardCommentCreate(req, body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 댓글 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete('board-comment-delete/:id')
  async boardCommentDelete(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    try {
      return this.boardCommentService.boardCommentDelete(req, id);
    } catch (e) {
      return e;
    }
  }
}
