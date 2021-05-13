import {
  CommandHandler,
  EventBus,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { OperatorBoolean } from 'src/shared/enums/operator-boolean.enum';
import { QueryParseService } from '../../../../../shared/services/query-parse/query-parse.service';
import { Role } from '../../../domain/entities/role.entity';
import { RolesUpdatedEvent } from '../../../domain/events/roles-updated.event';
import { RoleModel } from '../../../domain/models/role.model';
import { RoleFindQuery } from '../../queries/impl/role-find.query';
import { RolesUpdateCommand } from '../impl/roles-update.command';

@CommandHandler(RolesUpdateCommand)
export class RolesUpdateCommandHandlers
  implements ICommandHandler<RolesUpdateCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
    private readonly roleModel: RoleModel,
    private readonly queryParseService: QueryParseService,
  ) {}

  async execute({ roles }: RolesUpdateCommand): Promise<Role[]> {
    const rolesUpdated: Role[] = [];

    for (const role of roles) {
      const conflictKey = await this.queryBus.execute(
        new RoleFindQuery(
          this.queryParseService.parseOneFilterByKey(
            { _key: role._key },
            OperatorBoolean.AND,
          ),
        ),
      );

      const conflictName = role.name
        ? await this.queryBus.execute(
            new RoleFindQuery(
              this.queryParseService.parseOneFilterByKey(
                { name: role.name },
                OperatorBoolean.AND,
              ),
            ),
          )
        : null;

      const conflictDefault = role.default
        ? await this.queryBus.execute(
            new RoleFindQuery(
              this.queryParseService.parseOneFilterByKey(
                { default: role.default },
                OperatorBoolean.AND,
              ),
            ),
          )
        : null;

      const roleUpdated = await this.roleModel.update(role, {
        conflictKey,
        conflictName,
        conflictDefault,
      });

      rolesUpdated.push({ ...roleUpdated });
    }

    this.eventBus.publish(new RolesUpdatedEvent(rolesUpdated));

    return rolesUpdated;
  }
}
