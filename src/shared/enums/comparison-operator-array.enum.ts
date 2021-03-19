import { registerEnumType } from '@nestjs/graphql';

export enum ComparisonOperatorArray {
  IN = 'IN',
  NOT_IN = 'NOT IN',
}

registerEnumType(ComparisonOperatorArray, {
  name: 'ComparisonOperatorArray',
  description: 'Comparison operators for array values.',
});
