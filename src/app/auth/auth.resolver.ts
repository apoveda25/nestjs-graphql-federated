import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignInAuthCommand } from './commands/impl/sign-in-auth.command';
import { SignUpAuthCommand } from './commands/impl/sign-up-auth.command';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { SignInAuthInput } from './dto/sign-in-auth.input';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignUpAuthInput } from './dto/sign-up-auth.input';
import { Auth } from './entities/auth.entity';
import { SignInAuthPipe } from './pipes/sign-in-auth.pipe';
import { SignUpAuthPipe } from './pipes/sign-up-auth.pipe';

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
}
