import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { OwnerService } from '../owner/owner.service';
import { TrainerService } from 'src/trainer/trainer.service';
import { ClientService } from 'src/client/clients.service';
import { TrainerModule } from 'src/trainer/trainer.module';
import { OwnerModule } from 'src/owner/owner.module';
import { ClientModule } from 'src/client/clients.module';
// import { AuthService } from 'src/auth/auth.service';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
