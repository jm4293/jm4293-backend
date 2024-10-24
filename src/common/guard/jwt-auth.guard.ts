import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticatedRequest } from '~/type/interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(req); // 헤더에서 토큰 추출

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

  private extractTokenFromHeader(request: AuthenticatedRequest): string | null {
    const authHeader = request.headers['authorization']; // 헤더에서 authorization 가져오기
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1]; // Bearer 다음 부분을 추출
    return token || null;
  }
}
