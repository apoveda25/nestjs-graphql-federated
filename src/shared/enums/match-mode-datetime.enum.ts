import { registerEnumType } from '@nestjs/graphql';

export enum MatchModeDatetime {
  EQUAL = '==',
  DISTINCT = '!=',
  LESS = '<',
  LESS_EQUAL = '<=',
  GREATER = '>',
  GREATER_EQUAL = '>=',
}

registerEnumType(MatchModeDatetime, {
  name: 'MatchModeDatetime',
  description: 'Match mode for datetime string values.',
});
