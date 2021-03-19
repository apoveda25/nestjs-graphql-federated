import { Inject, Injectable, PipeTransform, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class UpdateResourcesPipe implements PipeTransform {
  constructor(@Inject(CONTEXT) private readonly context) {}

  transform(value: any) {
    return value.map((el) => ({
      ...el,
      _key: el._id.split('/')[1],
      updatedBy: this.context.user._id,
    }));
  }
}
