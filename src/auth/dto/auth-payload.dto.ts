import { IsString, Matches, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^\S*$/, { message: 'Username must not have whitespaces' })
  username: string;

  @IsString()
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  password: string;
}
