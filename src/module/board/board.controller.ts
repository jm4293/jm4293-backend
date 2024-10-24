import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/common/guard';
import { AuthenticatedRequest } from '~/type/interface';
import { BoardCreateRequestDto, BoardModifyRequestDto } from '~/module/board/request';
import { BoardService } from '~/module/board/board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '게시글 상세' })
  @UseGuards(JwtAuthGuard)
  @Get('board-detail/:id')
  async board(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    try {
      return this.boardService.boardDetail(req, id);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 리스트' })
  @UseGuards(JwtAuthGuard)
  @Get('board-list')
  async boardList() {
    try {
      return this.boardService.boardList();
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 작성' })
  @UseGuards(JwtAuthGuard)
  @Post('board-create')
  async boardCreate(@Req() req: AuthenticatedRequest, @Body() body: BoardCreateRequestDto) {
    try {
      return this.boardService.boardCreate(req, body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 수정' })
  @UseGuards(JwtAuthGuard)
  @Patch('board-update')
  async boardUpdate(@Req() req: AuthenticatedRequest, @Body() body: BoardModifyRequestDto) {
    try {
      return this.boardService.boardUpdate(req, body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '게시글 삭제' })
  @UseGuards(JwtAuthGuard)
  @Delete('board-delete/:id')
  async boardDelete(@Req() req: AuthenticatedRequest, @Param('id') id: number) {
    try {
      return this.boardService.boardDelete(req, id);
    } catch (e) {
      return e;
    }
  }
}
