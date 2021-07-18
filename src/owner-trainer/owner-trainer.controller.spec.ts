import { Test, TestingModule } from '@nestjs/testing';
import { OwnerTrainerController } from './owner-trainer.controller';

describe('OwnerTrainerController', () => {
  let controller: OwnerTrainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerTrainerController],
    }).compile();

    controller = module.get<OwnerTrainerController>(OwnerTrainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
