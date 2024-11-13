import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig } from '~/config';
import { DatabaseModule } from '~/database';
import { AuthController } from '~/module/auth/auth.controller';
import { AuthService } from '~/module/auth/auth.service';

@Module({
  imports: [DatabaseModule, JwtModule.registerAsync(jwtModuleConfig)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
