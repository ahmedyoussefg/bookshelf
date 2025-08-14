import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(authPayloadDto: AuthPayloadDto) {
    const matchingUser = await this.databaseService.user.findUnique({
      where: {
        username: authPayloadDto.username,
      },
    });

    if (!matchingUser) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(
      authPayloadDto.password,
      matchingUser.hashedPassword,
    );

    if (!passwordMatch) {
      return null;
    }
    const token = await this.generateToken(matchingUser.id);

    return {
      token: token,
    };
  }

  async createUser(newUser: AuthPayloadDto) {
    const existingUser = await this.databaseService.user.findUnique({
      where: {
        username: newUser.username,
      },
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);

    const registeredUser = await this.databaseService.user.create({
      data: {
        username: newUser.username,
        hashedPassword,
      },
    });

    const token = await this.generateToken(registeredUser.id);
    return {
      token,
    };
  }
  private async generateToken(userId: number) {
    return await this.jwtService.signAsync(
      {
        id: userId,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('JWT_SECRET_KEY'),
      },
    );
  }
}
