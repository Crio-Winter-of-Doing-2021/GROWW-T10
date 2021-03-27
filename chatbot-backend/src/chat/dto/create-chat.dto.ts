import { IsNotEmpty } from 'class-validator';

class node {
  description: string;
  requestUrl: string;
  inputParams?: string[]; // ["name", "email"]
  nextNodes: number[];
}

export class CreateChatDto extends Document {
  @IsNotEmpty()
  contextUri: string;

  @IsNotEmpty()
  nodeList: node[];
}
