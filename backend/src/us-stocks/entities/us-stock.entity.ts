import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UsStock extends Document {
  @Prop()
  isin: string;

  @Prop()
  sector: string;

  @Prop()
  name: string;

  @Prop()
  change: number;

  @Prop()
  changePercent: number;

  @Prop()
  lastPrice: number;

  @Prop()
  yesterdayClose: number;

  @Prop()
  marketCap: number;

  @Prop()
  pb: number;

  @Prop()
  pe: number;

  @Prop()
  enterprisValue: number;

  @Prop()
  divYield: number;

  @Prop()
  bookValue: number;

  @Prop()
  roe: number;

  @Prop()
  eps: number;
}

export const UsStockSchema = SchemaFactory.createForClass(UsStock);
