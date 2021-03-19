import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorNumber {
  EQUAL = '==',
  DISTINCT = '!=',
  LESS = '<',
  LESS_EQUAL = '<=',
  GREATER = '>',
  GREATER_EQUAL = '>=',
}

registerEnumType(ComparisonOperatorNumber, {
  name: 'ComparisonOperatorNumber',
  description: 'Comparison operators for number values.',
});
