import { Clients } from 'src/entities/clients.entity';

export class HowYouFeelDto {
  client: Clients;
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  year: number;
}
