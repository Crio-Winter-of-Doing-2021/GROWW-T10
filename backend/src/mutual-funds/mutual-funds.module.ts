import { Module } from '@nestjs/common';
import { MutualFundsService } from './mutual-funds.service';
import { MutualFundsController } from './mutual-funds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MutualFund, MutualFundSchema } from './entities/mutual-fund.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MutualFund.name,
        schema: MutualFundSchema,
      },
    ]),
  ],
  controllers: [MutualFundsController],
  providers: [MutualFundsService],
})
export class MutualFundsModule {}
