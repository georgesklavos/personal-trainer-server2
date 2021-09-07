import { IsDefined, IsEmail, IsNumber, IsUUID } from 'class-validator';

export class userAuthInfo {
  @IsDefined()
  @IsUUID()
  id: number;
  @IsDefined()
  @IsEmail()
  email: string;
  @IsDefined()
  @IsNumber()
  role: number;
}
