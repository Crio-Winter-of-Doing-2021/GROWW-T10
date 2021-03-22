import { Test, TestingModule } from '@nestjs/testing';
import { MutualFundsController } from './mutual-funds.controller';
import { MutualFundsService } from './mutual-funds.service';

describe('MutualFundsController', () => {
  let controller: MutualFundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MutualFundsController],
      providers: [MutualFundsService],
    }).compile();

    controller = module.get<MutualFundsController>(MutualFundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
