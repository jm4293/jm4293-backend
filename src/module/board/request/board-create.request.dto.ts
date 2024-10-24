import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class BoardCreateRequestDto {
  @ApiProperty({ description: '게시글 제목', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsString({ message: '게시글 제목은 문자열이어야 합니다.' })
  @IsString({ message: '게시글 제목은 필수 항목입니다.' })
  title: string;

  @ApiProperty({ description: '게시글 내용', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsString({ message: '게시글 내용은 문자열이어야 합니다.' })
  @IsString({ message: '게시글 내용은 필수 항목입니다.' })
  content: string;
}
