import { Test, TestingModule } from '@nestjs/testing';
import { HelperTablesService } from './helper-tables.service';

describe('HelperTablesService', () => {
  let service: HelperTablesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelperTablesService],
    }).compile();

    service = module.get<HelperTablesService>(HelperTablesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
