import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  UsePipes,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentials: AuthCredentialsDto,
  ): Promise<void> {
    this.logger.log('sign up user')
    return this.authService.signUp(authCredentials);
  }

  //@UsePipes() also we can use this instead if body validation
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentials);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
   // console.log(user);
    return user
  }
}
