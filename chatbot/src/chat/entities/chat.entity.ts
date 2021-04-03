import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class _chat {
  path: string;
  childRoutes?: chat[];
  action: string;
  payload?: string;
  placeholder?: string[];
  data?: string;
}

@Schema()
export class chat extends Document {
  @Prop()
  path: string;

  @Prop([_chat])
  childRoutes?: _chat[];

  @Prop()
  action: string;

  @Prop()
  payload?: string;

  @Prop()
  placeholder?: string[];

  @Prop()
  data?: string;
}

export const chatSchema = SchemaFactory.createForClass(chat);
