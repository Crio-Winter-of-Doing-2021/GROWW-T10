import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';

export class UpdateStockDto extends PartialType(
  OmitType(CreateStockDto, ['isin'] as const),
) {}
