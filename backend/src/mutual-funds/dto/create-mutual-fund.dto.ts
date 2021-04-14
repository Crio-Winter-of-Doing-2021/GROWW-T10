import { IsNotEmpty } from 'class-validator';

export class CreateMutualFundDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  fund_name: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  sub_category: string;

  @IsNotEmpty()
  min_sip_investment: number;

  @IsNotEmpty()
  sip_allowed: boolean;

  @IsNotEmpty()
  lumpsum_allowed: boolean;

  @IsNotEmpty()
  return3y: number;

  @IsNotEmpty()
  return1y: number;

  @IsNotEmpty()
  return5y: number;

  @IsNotEmpty()
  return1d: number;

  @IsNotEmpty()
  risk_rating: number;

  @IsNotEmpty()
  scheme_name: string;

  @IsNotEmpty()
  scheme_type: string;

  @IsNotEmpty()
  fund_manager: string;

  @IsNotEmpty()
  fund_house: string;

  @IsNotEmpty()
  scheme_code: string;

  @IsNotEmpty()
  risk: string;

  @IsNotEmpty()
  doc_required: boolean;

  @IsNotEmpty()
  plan_type: string;

  @IsNotEmpty()
  logo_url: string;
}
