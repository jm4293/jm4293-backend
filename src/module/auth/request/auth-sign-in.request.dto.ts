import { IsNotEmpty, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AuthSignInRequestDto {
  @ApiProperty({ description: '이메일', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsString({ message: '아이디는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '아이디는 필수 항목입니다.' })
  // @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
  })
  @Type(() => String)
  @IsNotEmpty({ message: '비밀번호는 필수 항목입니다.' })
  // @Length(8, 20, { message: '비밀번호는 8자 이상, 20자 이하로 입력해야 합니다.' })
  password: string;
}
