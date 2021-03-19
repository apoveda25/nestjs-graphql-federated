import { CreateScopeInput } from './create-scope.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateScopeInput extends PartialType(CreateScopeInput) {
  @Field(() => Int)
  id: number;
}
