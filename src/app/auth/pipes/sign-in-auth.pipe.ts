import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { EMAIL, WORD } from '../../../shared/helpers/regex';
import { SignInAuthDto } from '../dto/sign-in-auth.dto';
import { SignInAuthInput } from '../dto/sign-in-auth.input';

@Injectable()
export class SignInAuthPipe implements PipeTransform {
  transform(signInAuthInput: SignInAuthInput): SignInAuthDto {
    if (
      WORD.test(signInAuthInput.usernameOrEmail) ||
      EMAIL.test(signInAuthInput.usernameOrEmail)
    )
      return signInAuthInput;

    throw new BadRequestException();
  }
}
