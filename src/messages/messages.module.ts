import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/entities/Messages.entity';
import { SupportChats } from 'src/entities/supportChats.entity';
import { UserModule } from 'src/users/users.module';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Messages, SupportChats]), UserModule],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
