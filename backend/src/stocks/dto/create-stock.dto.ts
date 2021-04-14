import { IsNotEmpty } from 'class-validator';

class LivePriceDto {
  type: string;
  symbol: string;
  tsInMillis: number;
  open: number;
  high: number;
  low: number;
  close: number;
  ltp: number;
  dayChange: number;
  dayChangePerc: number;
  lowPriceRange: number;
  highPriceRange: number;
  volume: number;
  totalBuyQty: number;
  totalSellQty: number;
}

export class CreateStockDto {
  @IsNotEmpty()
  isin: string;

  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  companyLogo: string;

  @IsNotEmpty()
  companyDescription: string;

  @IsNotEmpty()
  bseScriptCode: number;

  @IsNotEmpty()
  nseScriptCode: string;

  @IsNotEmpty()
  yearlyHighPrice: number;

  @IsNotEmpty()
  yearlyLowPrice: number;

  @IsNotEmpty()
  marketCap: number;

  @IsNotEmpty()
  pb: number;

  @IsNotEmpty()
  pe: number;

  @IsNotEmpty()
  industryPe: number;

  @IsNotEmpty()
  divYield: number;

  @IsNotEmpty()
  bookValue: number;

  @IsNotEmpty()
  roe: number;

  @IsNotEmpty()
  eps: number;

  @IsNotEmpty()
  livePriceDto: LivePriceDto;
}
