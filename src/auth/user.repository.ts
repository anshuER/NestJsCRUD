import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentials;

    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    // if (!password) {
    //   throw new ConflictException('Enter Password');
    //   console.log('error');
    // } else if (!username) {
    //   throw new ConflictException('Enter username');
    // } else {
    //}
    user.password = await this.hasPassword(password, user.salt);
    console.log(user.password, user.username);
    try {
      await user.save();
    } catch (error) {
      //   if (error.code === '23505') {
      //     throw new ConflictException('Username already exists');
      //   } else {
      //     throw new InternalServerErrorException();
      //   }
      console.log(error.code);
    }
  }

  async validateUserPassword(
    authCredentials: AuthCredentialsDto,
  ): Promise<string | null> {
    const { username, password } = authCredentials;
    const user = await this.findOne({
      where: {
        username: username,
      },
    });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
  private async hasPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
