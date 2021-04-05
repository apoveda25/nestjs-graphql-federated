import { InputType } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { FilterBooleanInput } from '../../../shared/dto/filter-boolean.input';
import { FilterIntInput } from '../../../shared/dto/filter-int.input';
import { FilterKeyInput } from '../../../shared/dto/filter-key.input';
import { FilterStringInput } from '../../../shared/dto/filter-string.input';
import { OperatorBoolean } from '../../../shared/enums/operator-boolean.enum';

@InputType()
export class FilterRoleDto {
  @IsArray()
  @IsOptional()
  _key?: FilterKeyInput[];

  @IsArray()
  @IsOptional()
  name?: FilterStringInput[];

  @IsArray()
  @IsOptional()
  description?: FilterStringInput[];

  @IsArray()
  @IsOptional()
  active?: FilterBooleanInput[];

  @IsArray()
  @IsOptional()
  default?: FilterBooleanInput[];

  @IsArray()
  @IsOptional()
  createdBy?: FilterStringInput[];

  @IsArray()
  @IsOptional()
  updatedBy?: FilterStringInput[];

  @IsArray()
  @IsOptional()
  createdAt?: FilterIntInput[];

  @IsArray()
  @IsOptional()
  updatedAt?: FilterIntInput[];

  @IsString()
  separator: OperatorBoolean;
}
