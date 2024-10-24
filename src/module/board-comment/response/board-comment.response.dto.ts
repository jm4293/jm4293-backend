import { ResponseDto } from '~/common/response';
import { ResponseResultEnum } from '~/type/enum/response';
import { BadRequestException } from '@nestjs/common';

export class BoardCommentResponseDto extends ResponseDto {
  constructor(code: ResponseResultEnum, message: string, data?: unknown) {
    super(code, message, data);
  }

  static Success(message: string, data?: unknown) {
    return new BoardCommentResponseDto(ResponseResultEnum.SUCCESS, message, data);
  }

  static Fail(message: string) {
    return new BadRequestException(new BoardCommentResponseDto(ResponseResultEnum.FAIL, message));
  }
}
