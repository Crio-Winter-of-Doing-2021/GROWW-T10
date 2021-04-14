import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateGoldDto } from './create-gold.dto';

export class UpdateGoldDto extends PartialType(
  OmitType(CreateGoldDto, ['rateId'] as const),
) {}
