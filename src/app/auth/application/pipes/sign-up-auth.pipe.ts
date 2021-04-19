import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { delta } from '../../../../shared/helpers/delta';
import { codeDigitsGenerate } from '../../../../shared/helpers/generate-code';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { SignUpAuthDto } from '../../domain/dto/sign-up-auth.dto';
import { SignUpAuthInput } from '../../domain/dto/sign-up-auth.input';

@Injectable({ scope: Scope.REQUEST })
export class SignUpAuthPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

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
      createdBy: this.context.user._id,
      updatedBy: '',
      createdAt: Date.now(),
      updatedAt: 0,
    };
  }
}
