import { Injectable } from '@nestjs/common';
import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';
import { MatchModeID } from '../enums/match-mode-id.enum';
import { Operators } from '../enums/operators.enum';

@Injectable()
@InputType()
export class FilterKeyInput {
  @IsUUID(4)
  @Field(() => ID)
  value: string;

  @IsEnum(MatchModeID)
  @Field(() => MatchModeID)
  matchMode: string;

  @IsEnum(Operators)
  @Field(() => Operators)
  operator: string;
}
