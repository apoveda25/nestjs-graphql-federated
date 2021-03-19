import { Module } from '@nestjs/common';
import { FilterBooleanInput } from './dto/filter-boolean.input';
import { FilterDatetimeInput } from './dto/filter-datetime.input';
import { FilterFloatInput } from './dto/filter-float.input';
import { FilterIntInput } from './dto/filter-int.input';
import { FilterKeyInput } from './dto/filter-key.input';
import { FilterStringInput } from './dto/filter-string.input';
import { PaginationInput } from './dto/pagination.input';

@Module({
  providers: [
    PaginationInput,
    FilterKeyInput,
    FilterStringInput,
    FilterBooleanInput,
    FilterIntInput,
    FilterFloatInput,
    FilterDatetimeInput,
  ],
  exports: [],
})
export class SharedModule {}
