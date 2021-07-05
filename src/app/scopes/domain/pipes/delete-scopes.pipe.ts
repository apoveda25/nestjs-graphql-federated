import { Injectable, PipeTransform } from '@nestjs/common';
import { collectionsEnum } from 'src/shared/enums/collections.enum';
import { DeleteScopeDto } from '../dto/delete-scope.dto';
import { DeleteScopeInput } from '../dto/delete-scope.input';

@Injectable()
export class DeleteScopesPipe implements PipeTransform {
  transform(scopes: DeleteScopeInput[]): DeleteScopeDto[] {
    return scopes.map((scope) => ({
      _id: `${collectionsEnum.SCOPES}/${scope._key}`,
      ...scope,
    }));
  }
}
