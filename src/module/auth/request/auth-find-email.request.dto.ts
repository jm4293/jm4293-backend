import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class AuthFindEmailRequestDto {
  @ApiProperty({ description: '이름', required: true })
  @Transform(({ value }) => value.trim())
  @Type(() => String)
  @IsNotEmpty({ message: '이름은 필수 항목입니다.' })
  name: string;
}
