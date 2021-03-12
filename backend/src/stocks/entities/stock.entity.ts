import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class prevPrice {
  timestamp: Date;
  price: number;
}

@Schema()
export class Stock extends Document {
  @Prop()
  name: string;

  @Prop()
  stockId: string;

  @Prop()
  currentPrice: number;

  @Prop([prevPrice])
  previousPrices: prevPrice[];
}

export const StockSchema = SchemaFactory.createForClass(Stock);
