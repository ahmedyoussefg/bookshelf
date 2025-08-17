import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return { token: await this.authService.generateToken(req.user!.id) };
  }

  @Post('register')
  async register(@Body(ValidationPipe) newUser: AuthPayloadDto) {
    return await this.authService.createUser(newUser);
  }
}
