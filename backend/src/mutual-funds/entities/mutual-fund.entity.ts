import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MutualFund extends Document {
  @Prop()
  id: string;

  @Prop()
  fund_name: string;

  @Prop()
  category: string;

  @Prop()
  sub_category: string;

  @Prop()
  min_sip_investment: number;

  @Prop()
  sip_allowed: boolean;

  @Prop()
  lumpsum_allowed: boolean;

  @Prop()
  return3y: number;

  @Prop()
  return1y: number;

  @Prop()
  return5y: number;

  @Prop()
  return1d: number;

  @Prop()
  risk_rating: number;

  @Prop()
  scheme_name: string;

  @Prop()
  scheme_type: string;

  @Prop()
  fund_manager: string;

  @Prop()
  fund_house: string;

  @Prop()
  scheme_code: string;

  @Prop()
  risk: string;

  @Prop()
  doc_required: boolean;

  @Prop()
  plan_type: string;

  @Prop()
  logo_url: string;
}

export const MutualFundSchema = SchemaFactory.createForClass(MutualFund);
