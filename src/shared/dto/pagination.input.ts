import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
  @Min(0)
  @IsInt()
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset: number;

  @Max(500)
  @Min(1)
  @IsInt()
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  count: number;
}
