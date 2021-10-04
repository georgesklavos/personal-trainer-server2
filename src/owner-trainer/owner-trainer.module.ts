import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from 'src/client/clients.module';
import { DaysModule } from 'src/days/days.module';
import { Days } from 'src/entities/Days.entity';
import { Exercises } from 'src/entities/exercises.entity';
import { Macros } from 'src/entities/macros.entity';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { HowYouFeelModule } from 'src/how-you-feel/how-you-feel.module';
import { MacrosModule } from 'src/macros/macros.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { UserModule } from 'src/users/users.module';
import { OwnerTrainerController } from './owner-trainer.controller';
import { OwnerTrainerService } from './owner-trainer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exercises, Days]),
    ClientModule,
    PaymentsModule,
    HowYouFeelModule,
    MacrosModule,
    ExercisesModule,
    DaysModule,
    UserModule,
  ],
  controllers: [OwnerTrainerController],
  providers: [OwnerTrainerService],
})
export class OwnerTrainerModule {}
