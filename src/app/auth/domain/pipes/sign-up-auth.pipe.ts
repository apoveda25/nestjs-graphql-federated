import { Injectable, PipeTransform } from '@nestjs/common';
import { delta } from '../../../../shared/helpers/delta';
import { codeDigitsGenerate } from '../../../../shared/helpers/generate-code';
import { SignUpAuthDto } from '../dto/sign-up-auth.dto';
import { SignUpAuthInput } from '../dto/sign-up-auth.input';

@Injectable()
export class SignUpAuthPipe implements PipeTransform {
  transform(signUpAuthInput: SignUpAuthInput): SignUpAuthDto {
    return {
      _id: `Users/${signUpAuthInput._key}`,
      ...signUpAuthInput,
      name: '',
      surname: '',
      active: true,
      emailActive: false,
      emailCode: codeDigitsGenerate(6),
      emailCodeExpire: Date.now() + delta({ days: 1 }),
      birthday: null,
      gender: 'UNDEFINED',
      prefix: '',
      urlImage: '',
      createdBy: `Users/${signUpAuthInput._key}`,
      updatedBy: '',
      createdAt: Date.now(),
      updatedAt: null,
    };
  }
}
