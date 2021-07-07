import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserCreatedEvent } from '../../domain/events/user-created.event';
import { UserHasRoleCreateCommand } from '../commands/impl/users-has-role/user-has-role-create.command';

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        ({ user }) =>
          new UserHasRoleCreateCommand({
            _from: user._id,
            _to: user.roleId,
            createdAt: Date.now(),
            createdBy: user.createdBy,
            updatedAt: null,
            updatedBy: null,
          }),
      ),
    );
  };
}
