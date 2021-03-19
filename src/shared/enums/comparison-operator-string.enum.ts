import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorString {
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

registerEnumType(ComparisonOperatorString, {
  name: 'ComparisonOperatorString',
  description: 'Comparison operators for string values.',
});
