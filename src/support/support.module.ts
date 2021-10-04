import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/entities/Messages.entity';
import { SupportChats } from 'src/entities/supportChats.entity';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { Users } from 'src/entities/users.entity';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Messages, SupportChats, Users]),
    MessagesModule,
  ],
  providers: [SupportService],
  controllers: [SupportController],
})
export class SupportModule {}
