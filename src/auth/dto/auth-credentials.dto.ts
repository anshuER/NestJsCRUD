import {  IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @IsNotEmpty({message:'Please enter username'})
  username: string;

  @IsString()
  @MaxLength(20)
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  @IsNotEmpty({message:'Please enter password'})
  password?: string;
}
