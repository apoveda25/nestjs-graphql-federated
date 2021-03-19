import { Field, InputType } from '@nestjs/graphql';
import { ValidateNested } from 'class-validator';
import { CreateRoleDto } from './create-role.dto';

@InputType()
export class CreateRoleInput {
  @ValidateNested()
  @Field(() => CreateRoleDto)
  role: CreateRoleDto;
}
