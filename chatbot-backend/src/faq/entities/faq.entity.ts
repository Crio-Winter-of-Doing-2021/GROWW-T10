import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class faq extends Document {
  @Prop()
  category: string;
  @Prop()
  isLoginReq: boolean;
  @Prop()
  isKycReq: boolean;
  @Prop()
  tags: string[];
  @Prop()
  question: string;
  @Prop()
  answer: string;
  @Prop()
  upvotes: number;
  @Prop()
  downvotes: number;
}

export const faqSchema = SchemaFactory.createForClass(faq);
