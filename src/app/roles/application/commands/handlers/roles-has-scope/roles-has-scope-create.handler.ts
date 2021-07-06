import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { IEdge } from 'src/shared/interfaces/edge.interface';
import { OperatorBoolean } from '../../../../../../shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../../shared/services/query-parse/query-parse.service';
import { ScopeFindQuery } from '../../../../../scopes/application/queries/impl/scope-find.query';
import { Scope } from '../../../../../scopes/domain/entities/scope.entity';
import { CreateRoleHasScopeDto } from '../../../../domain/dto/roles-has-scope/create-role-has-scope.dto';
import { Role } from '../../../../domain/entities/role.entity';
import { RolesHasScopeCreatedEvent } from '../../../../domain/events/roles-has-scope/roles-has-scope-created.event';
import { RolesHasScopeModel } from '../../../../domain/models/roles-has-scope.model';
import { RoleFindQuery } from '../../../queries/impl/role-find.query';
import { RoleHasScopeFindQuery } from '../../../queries/impl/roles-has-scope/role-has-scope-find.query';
import { RolesHasScopeCreateCommand } from '../../impl/roles-has-scope/roles-has-scope-create.command';

@CommandHandler(RolesHasScopeCreateCommand)
export class RolesHasScopeCreateCommandHandler
  implements ICommandHandler<RolesHasScopeCreateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly rolesHasScopeModel: RolesHasScopeModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ input }: RolesHasScopeCreateCommand): Promise<Scope[]> {
    const createRoleHasScopeDto: CreateRoleHasScopeDto[] = [];
    const scopesAddedToRole: Scope[] = [];

    for (const roleHasScope of input) {
      const conflictEdge = await this.rolesHasScopeFind(roleHasScope);

      const conflictFrom = await this.roleFind(roleHasScope);

      const conflictTo = await this.scopeFind(roleHasScope);

      const createdRoleHasScopeDto = this.rolesHasScopeModel.createScopes(
        roleHasScope,
        { conflictEdge, conflictFrom, conflictTo },
      );

      createRoleHasScopeDto.push(createdRoleHasScopeDto);
      scopesAddedToRole.push(conflictTo);
    }

    this.eventBus.publish(new RolesHasScopeCreatedEvent(createRoleHasScopeDto));

    return scopesAddedToRole;
  }

  private async rolesHasScopeFind({
    _from,
    _to,
  }: CreateRoleHasScopeDto): Promise<IEdge<Scope>> {
    return await this.queryBus.execute(
      new RoleHasScopeFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _from, _to },
          OperatorBoolean.AND,
        ),
      ),
    );
  }

  private async roleFind({ _from }: CreateRoleHasScopeDto): Promise<Role> {
    return await this.queryBus.execute(
      new RoleFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: _from },
          OperatorBoolean.AND,
        ),
      ),
    );
  }

  private async scopeFind({ _to }: CreateRoleHasScopeDto): Promise<Scope> {
    return await this.queryBus.execute(
      new ScopeFindQuery(
        this.queryParseService.parseOneFilterByKey(
          { _id: _to },
          OperatorBoolean.AND,
        ),
      ),
    );
  }
}
