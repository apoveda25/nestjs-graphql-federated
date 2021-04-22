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
  context: ({ req }) => {
    return {
      user: {
        _id: req.headers['x-user-id'] ? req.headers['x-user-id'] : '',
        scopes: req.headers['x-scopes']
          ? req.headers['x-scopes'].split(',')
          : [],
      },
    };
  },
});
