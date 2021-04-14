import { IsNotEmpty } from 'class-validator';

export class CreateGoldDto {
  @IsNotEmpty()
  rateAmount: number;

  @IsNotEmpty()
  rateId: string;

  @IsNotEmpty()
  rateType: string;

  @IsNotEmpty()
  return_percent: number;

  @IsNotEmpty()
  logo_url: string;
}
