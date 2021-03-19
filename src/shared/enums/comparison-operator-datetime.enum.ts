import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorDatetime {
  EQUAL = '==',
  DISTINCT = '!=',
  LESS = '<',
  LESS_EQUAL = '<=',
  GREATER = '>',
  GREATER_EQUAL = '>=',
}

registerEnumType(ComparisonOperatorDatetime, {
  name: 'ComparisonOperatorDatetime',
  description: 'Comparison operators for datetime values.',
});
