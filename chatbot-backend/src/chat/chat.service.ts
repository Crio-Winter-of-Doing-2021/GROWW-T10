import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(chat.name) private readonly chatModel: Model<chat>,
  ) {}

  async initialize(initUri: string) {
    const chat = await this.chatModel.findOne({ contextUri: initUri }).exec();
    if (!chat) {
      throw new NotFoundException(`Chat #${initUri} not found!`);
    }
    return chat;
  }

  create(createChatDto: CreateChatDto) {
    const chat = new this.chatModel(createChatDto);
    return chat.save();
  }

  findAll() {
    return this.chatModel.find().exec();
  }

  async findOne(id: string) {
    const chat = await this.chatModel.findOne({ _id: id }).exec();
    if (!chat) {
      throw new NotFoundException(`Chat #${id} not found!`);
    }
    return chat;
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    const existingChat = await this.chatModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateChatDto },
        { useFindAndModify: false },
      )
      .exec();
    if (!existingChat) {
      throw new NotFoundException(`Chat #${id} not found!`);
    }
    return existingChat;
  }

  async remove(id: string) {
    const chat = await this.findOne(id);
    return chat.remove();
  }
}
