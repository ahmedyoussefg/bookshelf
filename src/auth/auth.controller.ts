import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  async login(@Body() loggingUser: AuthPayloadDto) {
    return await this.authService.validateUser(loggingUser);
  }

  @Post('register')
  async register(@Body() newUser: AuthPayloadDto) {
    return await this.authService.createUser(newUser);
  }
}
