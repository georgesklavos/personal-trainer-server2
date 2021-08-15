import { IsDefined, IsNumber, Max, Min } from 'class-validator';
import { Clients } from 'src/entities/clients.entity';

export class HowYouFeelDto {
  @IsDefined()
  @IsNumber()
  client: Clients;
  @IsDefined()
  @IsNumber()
  @Min(1)
  @Max(12)
  month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  @IsDefined()
  @IsNumber()
  year: number;
}
