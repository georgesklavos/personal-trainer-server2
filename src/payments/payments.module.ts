import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/clients.module';
import { Clients } from 'src/entities/clients.entity';
import { Payments } from 'src/entities/Payments.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payments, Clients]), ClientModule],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
