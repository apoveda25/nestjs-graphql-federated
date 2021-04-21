import { Injectable, PipeTransform } from '@nestjs/common';
import { delta } from '../../../../shared/helpers/delta';
import { codeDigitsGenerate } from '../../../../shared/helpers/generate-code';
import { SignUpAuthDto } from '../../domain/dto/sign-up-auth.dto';
import { SignUpAuthInput } from '../../domain/dto/sign-up-auth.input';

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
      birthday: 0,
      gender: 'UNDEFINED',
      prefix: '',
      urlImage: '',
      createdBy: `Users/${signUpAuthInput._key}`,
      updatedBy: '',
      createdAt: Date.now(),
      updatedAt: 0,
    };
  }
}
