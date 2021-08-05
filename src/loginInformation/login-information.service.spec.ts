import { Test, TestingModule } from '@nestjs/testing';
import { LoginInformationService } from './login-information.service';

describe('LoginInformationService', () => {
  let service: LoginInformationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginInformationService],
    }).compile();

    service = module.get<LoginInformationService>(LoginInformationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
