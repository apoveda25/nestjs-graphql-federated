import { Injectable, PipeTransform } from '@nestjs/common';
import { collectionsEnum } from 'src/shared/enums/collections.enum';
import { DeleteScopeDto } from '../dto/delete-scope.dto';
import { DeleteScopeInput } from '../dto/delete-scope.input';

@Injectable()
export class DeleteScopePipe implements PipeTransform {
  transform(scope: DeleteScopeInput): DeleteScopeDto {
    return {
      _id: `${collectionsEnum.SCOPES}/${scope._key}`,
      ...scope,
    };
  }
}
