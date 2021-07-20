import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainerController } from './trainer/trainer.controller';
import { TrainerModule } from './trainer/trainer.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/clients.module';
import { MutualModule } from './mutual/mutual.module';
import { OwnerModule } from './owner/owner.module';
import { OwnerTrainerModule } from './owner-trainer/owner-trainer.module';
import { UserModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Users } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UserModule,
    PassportModule,
    TrainerModule,
    AdminModule,
    ClientModule,
    MutualModule,
    OwnerModule,
    OwnerTrainerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
