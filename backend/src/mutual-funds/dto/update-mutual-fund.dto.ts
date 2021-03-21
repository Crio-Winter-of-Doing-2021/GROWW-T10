import { PartialType } from '@nestjs/mapped-types';
import { CreateMutualFundDto } from './create-mutual-fund.dto';

export class UpdateMutualFundDto extends PartialType(CreateMutualFundDto) {}
