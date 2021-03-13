import { IsNotEmpty } from 'class-validator';

class prevPrice {
  close: number;
  ltp: number;
  tsInMills: number;
}

export class CreateStockDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly currentPrice: number;

  @IsNotEmpty()
  readonly previousPrices: prevPrice[];
}
