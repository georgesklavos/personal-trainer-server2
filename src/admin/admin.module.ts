import { Module } from '@nestjs/common';
import { OwnerModule } from 'src/owner/owner.module';
import { UserModule } from 'src/users/users.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [OwnerModule, UserModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
