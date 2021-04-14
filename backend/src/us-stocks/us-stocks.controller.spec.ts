import { Test, TestingModule } from '@nestjs/testing';
import { UsStocksController } from './us-stocks.controller';
import { UsStocksService } from './us-stocks.service';

describe('UsStocksController', () => {
  let controller: UsStocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsStocksController],
      providers: [UsStocksService],
    }).compile();

    controller = module.get<UsStocksController>(UsStocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
