import { Edge } from 'arangojs/documents';
import { Role } from '../../../roles/domain/entities/role.entity';
import { Scope } from '../../../scopes/domain/entities/scope.entity';

export interface IRoleAddScopesConflicts {
  conflictEdge: Edge;
  conflictFrom: Role;
  conflictTo: Scope;
}

export interface IRoleRemoveScopesConflicts {
  conflictEdge: Edge;
}
