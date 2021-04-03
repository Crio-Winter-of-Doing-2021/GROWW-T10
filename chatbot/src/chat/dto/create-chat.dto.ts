import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  path: string;

  @IsOptional()
  childRoutes?: chat[];

  @IsNotEmpty()
  action: string;

  @IsOptional()
  payload?: string;

  @IsOptional()
  placeholder?: string;

  @IsOptional()
  data?: string;
}

class chat {
  path: string;
  childRoutes?: chat[];
  action: string;
  payload?: string;
  placeholder?: string;
  data?: string;
}
