import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateMutualFundDto } from './create-mutual-fund.dto';

export class UpdateStockDto extends PartialType(
  OmitType(CreateMutualFundDto, ['name'] as const),
) {}
