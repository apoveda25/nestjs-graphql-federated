import { registerEnumType } from '@nestjs/graphql';

export enum ScopeAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  FIND = 'FIND',
  SEARCH = 'SEARCH',
  COUNT = 'COUNT',
  ADD = 'ADD',
  CHANGE = 'CHANGE',
  REMOVE = 'REMOVE',
  READ = 'READ',
}

registerEnumType(ScopeAction, {
  name: 'ScopeAction',
});
