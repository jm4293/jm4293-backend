import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedUserRequest } from '~/type/interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedUserRequest>();
    const token = this.extractTokenFromCookie(req);

    if (!token) {
      throw new UnauthorizedException('토큰이 존재하지 않습니다.');
    }

    try {
      req.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }
  }

  private extractTokenFromHeader(request: AuthenticatedUserRequest): string | undefined {
    const accessToken = request.headers['authorization'];

    if (!accessToken) {
      return undefined;
    }

    const token = accessToken.split(' ')[1];
    return token || undefined;
  }

  private extractTokenFromCookie(request: AuthenticatedUserRequest): string | null {
    const accessToken = request.cookies['accessToken'];
    return accessToken || undefined;
  }
}
