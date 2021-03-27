import { Body, Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatInit } from './dto/chat-init.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/init')
  init(@Body() chatInit: ChatInit) {
    return this.chatService.initialize(chatInit);
  }
}
