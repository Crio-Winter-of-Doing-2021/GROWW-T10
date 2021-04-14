import { IsNotEmpty } from 'class-validator';

export class CreateUsStockDto {
  @IsNotEmpty()
  isin: string;

  @IsNotEmpty()
  sector: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  change: number;

  @IsNotEmpty()
  changePercent: number;

  @IsNotEmpty()
  lastPrice: number;

  @IsNotEmpty()
  yesterdayClose: number;

  @IsNotEmpty()
  marketCap: number;

  @IsNotEmpty()
  pb: number;

  @IsNotEmpty()
  pe: number;

  @IsNotEmpty()
  enterprisValue: number;

  @IsNotEmpty()
  divYield: number;

  @IsNotEmpty()
  bookValue: number;

  @IsNotEmpty()
  roe: number;

  @IsNotEmpty()
  eps: number;
}
