import { Test, TestingModule } from '@nestjs/testing';
import { FixedDepositsService } from './fixed-deposits.service';

describe('FixedDepositsService', () => {
  let service: FixedDepositsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FixedDepositsService],
    }).compile();

    service = module.get<FixedDepositsService>(FixedDepositsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
