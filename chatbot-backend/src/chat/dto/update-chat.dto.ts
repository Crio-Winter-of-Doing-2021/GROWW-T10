import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';

export class UpdateChatDto extends PartialType(
  OmitType(CreateChatDto, ['contextUri'] as const),
) {}
