import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { chat, chatSchema } from './entities/chat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: chat.name,
        schema: chatSchema,
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
