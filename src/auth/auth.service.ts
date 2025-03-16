import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  // TODO: Replace with a database
  private users: User[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = {
      id: this.users.length + 1,
      ...registerDto,
      password: hashedPassword,
    };

    this.users.push(user);

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = this.users.find((user) => user.email === loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
