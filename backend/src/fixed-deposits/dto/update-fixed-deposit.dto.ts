import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateFixedDepositDto } from './create-fixed-deposit.dto';

export class UpdateFixedDepositDto extends PartialType(
  OmitType(CreateFixedDepositDto, ['id'] as const),
) {}
