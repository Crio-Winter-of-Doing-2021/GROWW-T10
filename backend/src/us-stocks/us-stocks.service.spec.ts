import { Test, TestingModule } from '@nestjs/testing';
import { UsStocksService } from './us-stocks.service';

describe('UsStocksService', () => {
  let service: UsStocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsStocksService],
    }).compile();

    service = module.get<UsStocksService>(UsStocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
