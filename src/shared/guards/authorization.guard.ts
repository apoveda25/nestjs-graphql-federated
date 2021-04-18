import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IContextGraphQL } from '../../shared/interfaces/context-graphql.interface';
import { AUTHORIZATION_KEY } from '../decorators/authorization.decorator';
import { AuthorizationEnum } from '../enums/authorization';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const GqlCtx = GqlExecutionContext.create(context);
    const ctx = GqlCtx.getContext<IContextGraphQL>();
    const requiredPermissions = this.reflector.getAllAndOverride<
      AuthorizationEnum[]
    >(AUTHORIZATION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) return true;

    const { user } = ctx;

    return requiredPermissions.some((scope) => user.scopes?.includes(scope));
  }
}
