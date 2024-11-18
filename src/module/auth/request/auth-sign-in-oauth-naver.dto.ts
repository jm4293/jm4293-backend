import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthSignInOauthNaverDto {
  @ApiProperty({ description: '네이버 accessToken', required: true })
  @Type(() => String)
  @IsNotEmpty({ message: '네이버 accessToken은 필수 항목입니다.' })
  accessToken: string;

  @ApiProperty({ description: '네이버 refreshToken', required: true })
  @Type(() => String)
  @IsNotEmpty({ message: '네이버 refreshToken은 필수 항목입니다.' })
  refreshToken: string;
}
