import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

export const arangodbConfig = (configService: ConfigService) => {
  return {
    url: configService.get('arangodb.urls'),
    databaseName: configService.get('arangodb.name'),
    auth: {
      username: configService.get('arangodb.username'),
      password: configService.get('arangodb.password'),
    },
    agentOptions: {
      ca: configService
        .get('arangodb.certs')
        .map((cert: string) => readFileSync(cert)),
    },
  };
};
