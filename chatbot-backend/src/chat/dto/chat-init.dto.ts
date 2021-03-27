import { IsNotEmpty, IsOptional } from 'class-validator';

export class ChatInit {
  @IsNotEmpty()
  context: {
    absolutePath: string;
    uri: string;
    pageTag: string;
  };

  @IsNotEmpty()
  isLoggedIn: boolean;

  @IsOptional()
  userId?: string;
}
