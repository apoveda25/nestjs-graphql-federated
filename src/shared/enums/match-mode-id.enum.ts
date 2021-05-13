import { registerEnumType } from '@nestjs/graphql';

export enum MatchModeID {
  EQUAL = '==',
  DISTINCT = '!=',
}

registerEnumType(MatchModeID, {
  name: 'MatchModeID',
  description: 'Match mode for ID values.',
});
