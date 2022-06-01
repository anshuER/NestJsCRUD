import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.userRepo.signUp(authCredentials);
  }
  async signIn(
    authCredentials: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepo.validateUserPassword(authCredentials);
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
