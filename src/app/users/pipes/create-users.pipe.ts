import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { delta } from '../../../shared/helpers/delta';
import { codeDigitsGenerate } from '../../../shared/helpers/generate-code';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable({ scope: Scope.REQUEST })
export class CreateUsersPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context) {}

  transform(value: CreateUserInput[]): CreateUserInput[] {
    return value.map(({ user, roleId }) => ({
      user: {
        ...user,
        _key: user._id.split('/')[1],
        active: true,
        emailActive: false,
        emailCode: codeDigitsGenerate(6),
        emailCodeExpire: Date.now() + delta({ days: 1 }),
        createdBy: this.context.user._id,
        updatedBy: '',
        createdAt: Date.now(),
        updatedAt: 0,
      },
      roleId,
    }));
  }
}
