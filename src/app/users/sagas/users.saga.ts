import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAddRoleCommand } from '../../users-has-role/commands/impl/user-add-role.command';
import { UserCreatedEvent } from '../events/impl/user-created.event';

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        ({ user }) =>
          new UserAddRoleCommand({
            _from: user._id,
            _to: user.roleId,
            createdAt: user.createdAt,
            createdBy: user.createdBy,
            updatedAt: user.updatedAt,
            updatedBy: user.updatedBy,
          }),
      ),
    );
  };
}
