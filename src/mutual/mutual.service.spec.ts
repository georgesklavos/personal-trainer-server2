import { Test, TestingModule } from '@nestjs/testing';
import { MutualService } from './mutual.service';

describe('MutualService', () => {
  let service: MutualService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MutualService],
    }).compile();

    service = module.get<MutualService>(MutualService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
