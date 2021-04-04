import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  path: string;

  @IsOptional()
  childRoutes?: _chat[];

  @IsNotEmpty()
  action: string;

  @IsOptional()
  payload?: string;

  @IsOptional()
  placeholder?: string[];

  @IsOptional()
  data?: string;
}

class _chat {
  path: string;
  childRoutes?: _chat[];
  action: string;
  payload?: string;
  placeholder?: string[];
  data?: string;
}
