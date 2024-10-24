import { ConfigModuleOptions } from '@nestjs/config';

export const configModuleConfig: ConfigModuleOptions = {
  envFilePath: ['.env'],
  isGlobal: true,
};
