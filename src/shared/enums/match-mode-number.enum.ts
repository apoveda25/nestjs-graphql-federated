import { registerEnumType } from '@nestjs/graphql';

export enum MatchModeNumber {
  EQUAL = '==',
  DISTINCT = '!=',
  LESS = '<',
  LESS_EQUAL = '<=',
  GREATER = '>',
  GREATER_EQUAL = '>=',
}

registerEnumType(MatchModeNumber, {
  name: 'MatchModeNumber',
  description: 'Match mode for number values.',
});
