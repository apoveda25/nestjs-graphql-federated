import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

export const graphqlFederatedConfig: (
  configService: ConfigService,
) => GqlModuleOptions = (configService: ConfigService) => ({
  dateScalarMode: 'timestamp',
  introspection: configService.get('graphql.introspection'),
  playground: configService.get('graphql.playground'),
  subscriptions: configService.get('graphql.subscriptions'),
  autoSchemaFile: join(
    process.cwd(),
    configService.get('graphql.autoSchemaFile'),
  ),
  sortSchema: configService.get('graphql.sortSchema'),
  context: ({ req }) => {
    const user = req.headers['x-user']
      ? JSON.parse(req.headers['x-user'])
      : { _id: '', active: false, emailActive: false };

    const role = req.headers['x-role']
      ? JSON.parse(req.headers['x-role'])
      : { _id: '', _key: '', level: 9 };

    const scopes = req.headers['x-scopes']
      ? req.headers['x-scopes'].split(',')
      : [];

    return { user: { ...user, role, scopes } };
  },
});
