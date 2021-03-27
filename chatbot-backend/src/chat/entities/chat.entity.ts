import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class node {
  description: string;
  requestUrl?: string;
  inputParams?: string[]; // ["name", "email"]
  nextNodes: number[];
}

@Schema()
export class chat extends Document {
  @Prop()
  contextUri: string;

  @Prop([node])
  nodeList: node[];
}

export const chatSchema = SchemaFactory.createForClass(chat);
