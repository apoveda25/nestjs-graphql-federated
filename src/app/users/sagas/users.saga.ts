// import { Injectable } from '@nestjs/common';
// import { ICommand, ofType, Saga } from '@nestjs/cqrs';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { UserCreatedEvent } from '../events/impl/user-created.event';

// @Injectable()
// export class UsersSagas {
//   @Saga()
//   dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
//     return events$.pipe(
//       ofType(UserCreatedEvent),
//       map((event) => new DropAncientItemCommand(event.heroId, fakeItemID)),
//     );
//   };
// }
