import { Test, TestingModule } from '@nestjs/testing';
import { GoldController } from './gold.controller';
import { GoldService } from './gold.service';

describe('GoldController', () => {
  let controller: GoldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoldController],
      providers: [GoldService],
    }).compile();

    controller = module.get<GoldController>(GoldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
