import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class ChattingCreateRequestDto {
  @ApiProperty({ description: '채팅 내용', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsString({ message: '채팅 내용은 문자열이어야 합니다.' })
  @IsString({ message: '채팅 내용은 필수 항목입니다.' })
  content: string;
}
