import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleConfig, typeormPostgresConfig } from '~/config';
import { AuthModule } from '~/module/auth';
import { BoardModule } from '~/module/board';
import { BoardCommentModule } from '~/module/board-comment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleConfig),
    TypeOrmModule.forRootAsync(typeormPostgresConfig),
    AuthModule,
    BoardModule,
    BoardCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
