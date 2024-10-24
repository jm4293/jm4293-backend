import { ResponseDto } from '~/common/response';
import { ResponseResultEnum } from '~/type/enum/response';
import { BadRequestException } from '@nestjs/common';

export class BoardResponseDto extends ResponseDto {
  constructor(code: ResponseResultEnum, message: string, data?: unknown) {
    super(code, message, data);
  }

  static Success(message: string, data?: unknown) {
    return new BoardResponseDto(ResponseResultEnum.SUCCESS, message, data);
  }

  static Fail(message: string) {
    return new BadRequestException(new BoardResponseDto(ResponseResultEnum.FAIL, message));
  }
}
