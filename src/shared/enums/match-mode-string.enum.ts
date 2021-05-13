import { registerEnumType } from '@nestjs/graphql';

export enum MatchModeString {
  EQUAL = '==',
  DISTINCT = '!=',
  LESS = '<',
  LESS_EQUAL = '<=',
  GREATER = '>',
  GREATER_EQUAL = '>=',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT LIKE',
  REGEX = 'REGEX',
  NOT_REGEX = 'NOT REGEX',
}

registerEnumType(MatchModeString, {
  name: 'MatchModeString',
  description: 'Match mode for string values.',
});
