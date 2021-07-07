import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { AuthModule } from './app/auth/auth.module';
import { RolesModule } from './app/roles/roles.module';
import { ScopesModule } from './app/scopes/scopes.module';
import { UsersModule } from './app/users/users.module';
import { ArangodbModule } from './arangodb/arangodb.module';
import appConfig from './config/app.config';
import { arangodbConfig } from './config/arangodb.config';
import { graphqlFederatedConfig } from './config/graphql-federated.config';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [appConfig],
    }),
    ArangodbModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: arangodbConfig,
    }),
    GraphQLFederationModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: graphqlFederatedConfig,
    }),
    SharedModule,
    UsersModule,
    RolesModule,
    ScopesModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}
