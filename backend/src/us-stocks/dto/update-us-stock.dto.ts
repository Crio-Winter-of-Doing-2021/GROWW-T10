import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUsStockDto } from './create-us-stock.dto';

export class UpdateUsStockDto extends PartialType(
  OmitType(CreateUsStockDto, ['isin'] as const),
) {}
