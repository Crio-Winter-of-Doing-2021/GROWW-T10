import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class LivePriceDto {
  type: string;
  symbol: string;
  tsInMillis: number;
  open: number;
  high: number;
  low: number;
  close: number;
  ltp: number;
  dayChange: number;
  dayChangePerc: number;
  lowPriceRange: number;
  highPriceRange: number;
  volume: number;
  totalBuyQty: number;
  totalSellQty: number;
}

@Schema()
export class Stock extends Document {
  @Prop()
  isin: string;

  @Prop()
  companyName: string;

  @Prop()
  companyLogo: string;

  @Prop()
  companyDescription: string;

  @Prop()
  bseScriptCode: number;

  @Prop()
  nseScriptCode: string;

  @Prop()
  yearlyHighPrice: number;

  @Prop()
  yearlyLowPrice: number;

  @Prop()
  marketCap: number;

  @Prop()
  pb: number;

  @Prop()
  pe: number;

  @Prop()
  industryPe: number;

  @Prop()
  divYield: number;

  @Prop()
  bookValue: number;

  @Prop()
  roe: number;

  @Prop()
  eps: number;

  @Prop()
  livePriceDto: LivePriceDto;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
