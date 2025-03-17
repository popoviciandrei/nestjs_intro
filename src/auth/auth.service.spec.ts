import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/requestUser.inteface';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register and login a user', async () => {
    const mockUser = {
      email: 'test@test.com',
      password: 'password',
      username: 'test',
    };

    const user = await service.register(mockUser);

    expect(user).toBeDefined();

    const access = await service.login({
      email: mockUser.email,
      password: mockUser.password,
    });

    expect(access).toBeDefined();

    const decodedToken = service['jwtService'].verify<JwtPayload>(
      access.access_token,
    );

    expect(decodedToken).toBeDefined();
    expect(decodedToken.email).toBe(mockUser.email);
    expect(decodedToken.id).toBe(1);
  });
});
