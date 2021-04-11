import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpAuthCommand } from './commands/impl/sign-up-auth.command';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { SignUpAuthInput } from './dto/sign-up-auth.input';
import { Auth } from './entities/auth.entity';
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

  // @Query(() => [Auth], { name: 'auth' })
  // findAll() {
  //   return this.authService.findAll();
  // }
  // @Query(() => Auth, { name: 'auth' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.findOne(id);
  // }
  // @Mutation(() => Auth)
  // updateAuth(@Args('updateAuthInput') updateAuthInput: UpdateAuthInput) {
  //   return this.authService.update(updateAuthInput.id, updateAuthInput);
  // }
  // @Mutation(() => Auth)
  // removeAuth(@Args('id', { type: () => Int }) id: number) {
  //   return this.authService.remove(id);
  // }
}
