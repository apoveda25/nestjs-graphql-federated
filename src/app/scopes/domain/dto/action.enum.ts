import { registerEnumType } from '@nestjs/graphql';

export enum ScopeAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  FIND = 'FIND',
  SEARCH = 'SEARCH',
  COUNT = 'COUNT',
}

registerEnumType(ScopeAction, {
  name: 'ScopeAction',
});
