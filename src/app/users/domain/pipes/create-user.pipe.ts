import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { delta } from '../../../../shared/helpers/delta';
import { codeDigitsGenerate } from '../../../../shared/helpers/generate-code';
import { IContextGraphQL } from '../../../../shared/interfaces/context-graphql.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable({ scope: Scope.REQUEST })
export class CreateUserPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context: IContextGraphQL) {}

  transform(createUserInput: CreateUserInput): CreateUserDto {
    return {
      _id: `Users/${createUserInput._key}`,
      ...createUserInput,
      active: true,
      emailActive: false,
      emailCode: codeDigitsGenerate(6),
      emailCodeExpire: Date.now() + delta({ days: 1 }),
      urlImage: '',
      createdBy: this.context.user._id,
      updatedBy: '',
      createdAt: Date.now(),
      updatedAt: null,
    };
  }
}
