import { Clients } from 'src/entities/clients.entity';
import { Users } from 'src/entities/users.entity';

export class VerifyPaymentDto {
  userVerified?: Users;
  dateVerified: Date;
  client: Clients;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  year: number;
}
