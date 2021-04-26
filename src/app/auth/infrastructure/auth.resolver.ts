import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginAuthCommand } from '../application/commands/impl/login-auth.command';
import { SignInAuthCommand } from '../application/commands/impl/sign-in-auth.command';
import { SignUpAuthCommand } from '../application/commands/impl/sign-up-auth.command';
import { SignInAuthPipe } from '../application/pipes/sign-in-auth.pipe';
import { SignUpAuthPipe } from '../application/pipes/sign-up-auth.pipe';
import { SignInAuthDto } from '../domain/dto/sign-in-auth.dto';
import { SignInAuthInput } from '../domain/dto/sign-in-auth.input';
import { SignUpAuthDto } from '../domain/dto/sign-up-auth.dto';
import { SignUpAuthInput } from '../domain/dto/sign-up-auth.input';
import { Auth } from '../domain/entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @UsePipes(SignUpAuthPipe)
  @Mutation(() => Auth)
  async signUp(
    @Args(
      {
        name: 'payload',
        type: () => SignUpAuthInput,
      },
      new ValidationPipe({ expectedType: SignUpAuthDto }),
    )
    payload: SignUpAuthDto,
  ) {
    return await this.commandBus.execute(new SignUpAuthCommand(payload));
  }

  @UsePipes(SignInAuthPipe)
  @Mutation(() => Auth)
  async signIn(
    @Args(
      {
        name: 'payload',
        type: () => SignInAuthInput,
      },
      new ValidationPipe({ expectedType: SignInAuthDto }),
    )
    payload: SignInAuthDto,
  ) {
    return await this.commandBus.execute(new SignInAuthCommand(payload));
  }

  @UsePipes(SignInAuthPipe)
  @Mutation(() => Auth)
  async login(
    @Args(
      {
        name: 'payload',
        type: () => SignInAuthInput,
      },
      new ValidationPipe({ expectedType: SignInAuthDto }),
    )
    payload: SignInAuthDto,
  ) {
    return await this.commandBus.execute(new LoginAuthCommand(payload));
  }
}
