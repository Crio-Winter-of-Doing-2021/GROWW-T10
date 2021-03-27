import { Injectable } from '@nestjs/common';
import { ChatInit } from './dto/chat-init.dto';

@Injectable()
export class ChatService {
  initialize(chatInit: ChatInit) {
    return chatInit;
  }
}
