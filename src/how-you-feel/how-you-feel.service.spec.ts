import { Test, TestingModule } from '@nestjs/testing';
import { HowYouFeelService } from './how-you-feel.service';

describe('HowYouFeelService', () => {
  let service: HowYouFeelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HowYouFeelService],
    }).compile();

    service = module.get<HowYouFeelService>(HowYouFeelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
