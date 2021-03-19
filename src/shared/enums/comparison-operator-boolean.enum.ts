import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorBoolean {
  EQUAL = '==',
  DISTINCT = '!=',
}

registerEnumType(ComparisonOperatorBoolean, {
  name: 'ComparisonOperatorBoolean',
  description: 'Comparison operators for boolean values.',
});
