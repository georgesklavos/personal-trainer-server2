import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/clients.module';
import { OwnerModule } from 'src/owner/owner.module';
import { TrainerModule } from 'src/trainer/trainer.module';
import { UserModule } from 'src/users/users.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [OwnerModule, UserModule, ClientModule, TrainerModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
