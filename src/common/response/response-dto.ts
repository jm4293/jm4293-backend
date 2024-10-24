import { InternalServerErrorException } from '@nestjs/common';
import { ResponseResultEnum } from '~/type/enum/response';

export class ResponseDto {
  constructor(
    private readonly result: ResponseResultEnum,
    private readonly message: string,
    private readonly data?: unknown,
  ) {}

  // Success(data: unknown) {
  //   return new ResponseDto(ResponseCodeEnum.SUCCESS, ResponseMessageEnum.SUCCESS, data);
  // }

  static DatabaseError() {
    throw new InternalServerErrorException(new ResponseDto(ResponseResultEnum.DATABASE_ERROR, '데이터베이스 에러'));
  }
}
