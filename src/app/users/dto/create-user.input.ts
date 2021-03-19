import { Field, ID, InputType } from '@nestjs/graphql';
import { Matches, ValidateNested } from 'class-validator';
import { ROLE_ID } from '../../../shared/helpers/regex';
import { CreateUserDto } from './create-user.dto';

@InputType()
export class CreateUserInput {
  @ValidateNested()
  @Field(() => CreateUserDto)
  user: CreateUserDto;

  @Matches(ROLE_ID)
  @Field(() => ID, {
    description: 'Example field (Roles/20f736ce-b6a0-4ed5-8062-47d32c844d3d)',
  })
  roleId: string;
}
