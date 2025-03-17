import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const mockUser = {
      email: 'test@test.com',
      password: 'password',
      username: 'test',
    };

    await controller.register(mockUser);
    expect(mockAuthService.register).toHaveBeenCalledWith(mockUser);
  });

  it('should login a user', async () => {
    const mockUser = {
      email: 'test@test.com',
      password: 'password',
    };

    await controller.login(mockUser);
    expect(mockAuthService.login).toHaveBeenCalledWith(mockUser);
  });
});
