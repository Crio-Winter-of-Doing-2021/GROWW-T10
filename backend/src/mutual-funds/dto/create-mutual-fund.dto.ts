import { IsNotEmpty } from 'class-validator';

class prevData {
  nav: number;
  tsInMills: number;
}

export class CreateMutualFundDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly currentNav: number;

  @IsNotEmpty()
  readonly previousData: prevData[];
}
