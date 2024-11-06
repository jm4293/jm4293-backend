import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class BoardCommentCreateRequestDto {
  @ApiProperty({ description: '댓글 내용', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsString({ message: '내용은 문자열이어야 합니다.' })
  content: string;

  @ApiProperty({ description: '게시글 번호', required: true })
  @Type(() => Number)
  @IsNumber()
  boardSeq: number;
}
