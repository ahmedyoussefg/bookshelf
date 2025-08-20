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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
@ApiBadRequestResponse({
  description: 'When request has invalid parameter/request body',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: AuthPayloadDto, description: 'User logging in' })
  @ApiOkResponse({ description: 'User logged in successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid User Credentials' })
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return {
      token: await this.authService.generateToken(req.user!.id),
      username: req.user!.username,
    };
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'User registered successfully' })
  async register(@Body(ValidationPipe) newUser: AuthPayloadDto) {
    return await this.authService.createUser(newUser);
  }
}
