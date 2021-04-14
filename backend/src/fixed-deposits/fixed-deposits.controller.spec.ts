import { Test, TestingModule } from '@nestjs/testing';
import { FixedDepositsController } from './fixed-deposits.controller';
import { FixedDepositsService } from './fixed-deposits.service';

describe('FixedDepositsController', () => {
  let controller: FixedDepositsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixedDepositsController],
      providers: [FixedDepositsService],
    }).compile();

    controller = module.get<FixedDepositsController>(FixedDepositsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
