import { Module } from '@nestjs/common';
import { OwnerModule } from 'src/owner/owner.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [OwnerModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
