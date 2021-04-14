import { IsNotEmpty } from 'class-validator';

export class CreateFixedDepositDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  bankName: string;

  @IsNotEmpty()
  bankCode: string;

  @IsNotEmpty()
  productName: string;

  @IsNotEmpty()
  bankProdCode: string;

  @IsNotEmpty()
  bankLogoUrl: string;

  @IsNotEmpty()
  tenure: string;

  @IsNotEmpty()
  minAmount: number;

  @IsNotEmpty()
  dayStart: number;

  @IsNotEmpty()
  dayEnd: number;

  @IsNotEmpty()
  maxAmount: number;

  @IsNotEmpty()
  interestRate: number;

  @IsNotEmpty()
  compoundingType: string;
}
