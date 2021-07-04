import { registerEnumType } from '@nestjs/graphql';

export enum scopesActionsEnum {
  SEARCH = 'SEARCH',
  COUNT = 'COUNT',
  FIND = 'FIND',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

registerEnumType(scopesActionsEnum, {
  name: 'scopesActionsEnum',
});
