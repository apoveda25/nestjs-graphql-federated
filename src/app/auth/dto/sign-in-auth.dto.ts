import { InputType } from '@nestjs/graphql';
import { IsString, Matches } from 'class-validator';
import { PASSWORD } from '../../../shared/helpers/regex';

@InputType()
export class SignInAuthDto {
  @IsString()
  usernameOrEmail: string;

  @Matches(PASSWORD)
  password: string;
}
