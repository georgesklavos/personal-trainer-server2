import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from 'src/entities/Payments.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payments])],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
