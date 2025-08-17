import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^\S*$/, { message: 'Username must not have whitespaces' })
  @ApiProperty()
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @ApiProperty()
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @ApiProperty()
  password: string;
}
