import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BoardCommentModel, BoardModel, UserModel } from '~/database/model';

export const typeormPostgresConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('SUPABASE_POSTGRES_HOST'),
    port: parseInt(configService.get<string>('SUPABASE_POSTGRES_PORT'), 10),
    username: configService.get<string>('SUPABASE_POSTGRES_USER_NAME'),
    password: configService.get<string>('SUPABASE_POSTGRES_PASSWORD'),
    database: configService.get<string>('SUPABASE_POSTGRES_DB_NAME'),
    entities: [UserModel, BoardModel, BoardCommentModel],
    synchronize: false,
  }),
};
