import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Gold extends Document {
  @Prop()
  rateAmount: number;

  @Prop()
  rateId: string;

  @Prop()
  rateType: string;

  @Prop()
  return_percent: number;

  @Prop()
  logo_url: string;
}

export const GoldSchema = SchemaFactory.createForClass(Gold);
