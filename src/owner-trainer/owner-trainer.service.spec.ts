import { Test, TestingModule } from '@nestjs/testing';
import { OwnerTrainerService } from './owner-trainer.service';

describe('OwnerTrainerService', () => {
  let service: OwnerTrainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerTrainerService],
    }).compile();

    service = module.get<OwnerTrainerService>(OwnerTrainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
