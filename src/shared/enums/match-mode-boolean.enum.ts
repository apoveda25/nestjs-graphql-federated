import { registerEnumType } from '@nestjs/graphql';

export enum MatchModeBoolean {
  EQUAL = '==',
  DISTINCT = '!=',
}

registerEnumType(MatchModeBoolean, {
  name: 'MatchModeBoolean',
  description: 'Match mode for boolean values.',
});
