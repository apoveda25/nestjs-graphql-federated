import { Injectable } from '@nestjs/common';
import { CreateScopeInput } from './dto/create-scope.input';
import { UpdateScopeInput } from './dto/update-scope.input';

@Injectable()
export class ScopesService {
  create(createScopeInput: CreateScopeInput) {
    return 'This action adds a new scope';
  }

  findAll() {
    return `This action returns all scopes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scope`;
  }

  update(id: number, updateScopeInput: UpdateScopeInput) {
    return `This action updates a #${id} scope`;
  }

  remove(id: number) {
    return `This action removes a #${id} scope`;
  }
}
