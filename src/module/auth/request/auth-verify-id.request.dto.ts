import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthVerifyIdRequestDto {
  @ApiProperty({ description: '이메일', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsString({ message: '아이디는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '아이디는 필수 항목입니다.' })
  email: string;

  @ApiProperty({ description: '이름', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsNotEmpty({ message: '이름은 필수 항목입니다.' })
  name: string;
}
