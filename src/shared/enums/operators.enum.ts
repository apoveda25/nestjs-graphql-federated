import { registerEnumType } from '@nestjs/graphql';

export enum Operators {
  AND = 'AND',
  OR = 'OR',
}

registerEnumType(Operators, {
  name: 'Operators',
  description: 'Support for operators.',
});
