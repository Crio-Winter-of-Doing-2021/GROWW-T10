import { IsNotEmpty } from 'class-validator';

export class CreateFaqDto {
  @IsNotEmpty()
  isLoginReq: boolean;

  @IsNotEmpty()
  isKycReq: boolean;

  @IsNotEmpty()
  tags: string[];

  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  answer: string;

  @IsNotEmpty()
  upvotes: number;

  @IsNotEmpty()
  downvotes: number;
}
