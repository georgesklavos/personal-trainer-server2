import {
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Clients } from 'src/entities/clients.entity';
import { Users } from 'src/entities/users.entity';

export class VerifyPaymentDto {
  @IsOptional()
  @IsNumber()
  userVerified?: Users;
  @IsDefined()
  @IsDateString()
  dateVerified: Date;
  @IsDefined()
  @IsNumber()
  client: Clients;
  @IsNumber()
  @Min(1)
  @Max(12)
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  @IsNumber()
  year: number;
}
