import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class prevData {
  nav: number;
  tsInMills: number;
}

@Schema()
export class MutualFund extends Document {
  @Prop()
  name: string;

  @Prop()
  currentNav: number;

  @Prop([prevData])
  previousData: prevData[];
}

export const MutualFundSchema = SchemaFactory.createForClass(MutualFund);
