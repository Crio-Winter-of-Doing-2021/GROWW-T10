import { Module } from '@nestjs/common';
import { UsStocksService } from './us-stocks.service';
import { UsStocksController } from './us-stocks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsStock, UsStockSchema } from './entities/us-stock.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UsStock.name,
        schema: UsStockSchema,
      },
    ]),
  ],
  controllers: [UsStocksController],
  providers: [UsStocksService],
})
export class UsStocksModule {}
