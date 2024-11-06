import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/common/guard';
import { AuthenticatedUserRequest, TablePageCountRequest } from '~/type/interface';
import { BoardCreateRequestDto, BoardModifyRequestDto } from '~/module/board/request';
import { BoardService } from '~/module/board/board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '게시글 상세' })
  @UseGuards(JwtAuthGuard)
  @Get('board-detail/:boardSeq')
  async board(@Req() req: AuthenticatedUserRequest, @Param('boardSeq') boardSeq: number) {
    try {
      return this.boardService.boardDetail(req, boardSeq);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get('board-list')
  async boardList(@Query() query: TablePageCountRequest) {
    try {
      return this.boardService.boardList(query);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 작성' })
  @UseGuards(JwtAuthGuard)
  @Post('board-create')
  async boardCreate(@Req() req: AuthenticatedUserRequest, @Body() body: BoardCreateRequestDto) {
    try {
      return this.boardService.boardCreate(req, body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 수정' })
  @UseGuards(JwtAuthGuard)
  @Patch('board-modify')
  async boardUpdate(@Req() req: AuthenticatedUserRequest, @Body() body: BoardModifyRequestDto) {
    try {
      return this.boardService.boardUpdate(req, body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete('board-delete/:boardSeq')
  async boardDelete(@Req() req: AuthenticatedUserRequest, @Param('boardSeq') boardSeq: number) {
    try {
      return this.boardService.boardDelete(req, boardSeq);
    } catch (e) {
      return e;
    }
  }
}
