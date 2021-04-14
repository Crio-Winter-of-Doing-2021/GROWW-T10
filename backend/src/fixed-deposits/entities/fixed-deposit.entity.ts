import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FixedDeposit extends Document {
  @Prop()
  id: string;

  @Prop()
  bankName: string;

  @Prop()
  bankCode: string;

  @Prop()
  productName: string;

  @Prop()
  bankProdCode: string;

  @Prop()
  bankLogoUrl: string;

  @Prop()
  tenure: string;

  @Prop()
  minAmount: number;

  @Prop()
  dayStart: number;

  @Prop()
  dayEnd: number;

  @Prop()
  maxAmount: number;

  @Prop()
  interestRate: number;

  @Prop()
  compoundingType: string;
}

export const FixedDepositSchema = SchemaFactory.createForClass(FixedDeposit);
