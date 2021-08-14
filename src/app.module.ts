import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerModule } from './trainer/trainer.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/clients.module';
import { MutualModule } from './mutual/mutual.module';
import { OwnerModule } from './owner/owner.module';
import { OwnerTrainerModule } from './owner-trainer/owner-trainer.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import * as ormconfig from '../ormconfig';
import { LoginInformationModule } from './login-information/login-information.module';
import { HelperTablesModule } from './helper-tables/helper-tables.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    OwnerModule,
    UserModule,
    PassportModule,
    TrainerModule,
    AdminModule,
    ClientModule,
    MutualModule,
    OwnerTrainerModule,
    LoginInformationModule,
    HelperTablesModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
