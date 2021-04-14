import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StocksModule } from './stocks/stocks.module';
import { MutualFundsModule } from './mutual-funds/mutual-funds.module';
import { FixedDepositsModule } from './fixed-deposits/fixed-deposits.module';
import { GoldModule } from './gold/gold.module';
import { UsStocksModule } from './us-stocks/us-stocks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    StocksModule,
    MutualFundsModule,
    FixedDepositsModule,
    GoldModule,
    UsStocksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
