import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';

export const graphqlFederatedConfig: (
  configService: ConfigService,
) => GqlModuleOptions = (configService: ConfigService) => ({
  introspection: configService.get('graphql.introspection'),
  playground: configService.get('graphql.playground'),
  subscriptions: configService.get('graphql.subscriptions'),
  autoSchemaFile: configService.get('graphql.autoSchemaFile'),
  sortSchema: configService.get('graphql.sortSchema'),
  context: ({ req }) => ({
    user: {
      _id: req.headers['x-user-id'],
      role: req.headers['x-role-id'],
    },
  }),
});
