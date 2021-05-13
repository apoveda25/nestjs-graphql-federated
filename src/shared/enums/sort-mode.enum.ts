import { registerEnumType } from '@nestjs/graphql';

export enum SortMode {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortMode, {
  name: 'SortMode',
  description: 'Sort mode support.',
});
