import { Module } from '@nestjs/common';
import { FixedDepositsService } from './fixed-deposits.service';
import { FixedDepositsController } from './fixed-deposits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FixedDeposit,
  FixedDepositSchema,
} from './entities/fixed-deposit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FixedDeposit.name,
        schema: FixedDepositSchema,
      },
    ]),
  ],
  controllers: [FixedDepositsController],
  providers: [FixedDepositsService],
})
export class FixedDepositsModule {}
