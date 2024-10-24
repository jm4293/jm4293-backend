import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BoardCommentCreateRequestDto {
  @ApiProperty({ description: '댓글 내용', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsString()
  content: string;

  @ApiProperty({ description: '게시글 번호', required: true })
  @Type(() => Number)
  @IsNumber()
  boardId: number;
}
