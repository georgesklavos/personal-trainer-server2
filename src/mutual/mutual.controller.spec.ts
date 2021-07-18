import { Test, TestingModule } from '@nestjs/testing';
import { MutualController } from './mutual.controller';

describe('MutualController', () => {
  let controller: MutualController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutualController],
    }).compile();

    controller = module.get<MutualController>(MutualController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
