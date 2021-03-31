import { ConflictException, NotFoundException } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';

export class UserCreateModel {
  constructor(private input: CreateUserInput) {}

  create(user: User[], role: unknown) {
    if (user.length) throw new ConflictException();

    if (!role) throw new NotFoundException();

    this.input.user.password = hashSync(
      this.input.user.password,
      genSaltSync(10),
    );
  }

  // commit(eventEmitter: EventEmitter2, event: CreateUserInput) {
  //   console.log('UserCreateModel');

  //   eventEmitter.emit(USER_CREATED, event);
  // }
  commit(event: CreateUserInput) {
    console.log('UserCreateModel');
  }
}
