import { Body, Controller, Post, Put, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';
import {
  AuthChangePasswordRequestDto,
  AuthFindEmailRequestDto,
  AuthSignInRequestDto,
  AuthSignUpRequestDto,
  AuthVerifyIdRequestDto,
} from '~/module/auth/request';
import { AuthService } from '~/module/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @Post('sign-in')
  async signIn(@Body() body: AuthSignInRequestDto, @Res() res: Response) {
    try {
      return this.userService.signIn(body, res);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '회원가입' })
  @Post('sign-up')
  async signUp(@Body() body: AuthSignUpRequestDto) {
    try {
      return this.userService.signUp(body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '비밀번호 찾기용 아이디 인증' })
  @Post('verify-id')
  async authId(@Body() body: AuthVerifyIdRequestDto) {
    try {
      return this.userService.authId(body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '비밀번호 변경' })
  @Put('change-password')
  async changePassword(@Body() body: AuthChangePasswordRequestDto) {
    try {
      return this.userService.changePassword(body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: '아이디 찾기' })
  @Post('find-email')
  async findId(@Body() body: AuthFindEmailRequestDto) {
    try {
      return this.userService.findEmail(body);
    } catch (e) {
      return e;
    }
  }

  @ApiOperation({ summary: 'refresh Token 이용한 access Token 재발급' })
  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    try {
      return this.userService.renewRefreshToken(refreshToken, res);
    } catch (e) {
      return e;
    }
  }
}
