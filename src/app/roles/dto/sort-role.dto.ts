import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { OperatorSort } from '../../../shared/enums/operator-sort.enum';

@InputType()
export class SortRoleDto {
  @IsBoolean()
  @IsOptional()
  _key?: boolean;

  @IsBoolean()
  @IsOptional()
  name?: boolean;

  @IsBoolean()
  @IsOptional()
  action?: boolean;

  @IsBoolean()
  @IsOptional()
  collection?: boolean;

  @IsBoolean()
  @IsOptional()
  createdBy?: boolean;

  @IsBoolean()
  @IsOptional()
  updatedBy?: boolean;

  @IsBoolean()
  @IsOptional()
  createdAt?: boolean;

  @IsBoolean()
  @IsOptional()
  updatedAt?: boolean;

  @IsEnum(OperatorSort)
  sort: OperatorSort;
}
