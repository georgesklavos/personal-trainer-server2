import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/entities/Messages.entity';
import { Roles } from 'src/entities/roles.entity';
import { SupportChats } from 'src/entities/supportChats.entity';
import { Users } from 'src/entities/users.entity';
import { getMessagesDto } from 'src/messages/getMessages.dto';
import { MessagesService } from 'src/messages/messages.service';
import { roles } from 'src/seeds/roles.seed';
import { Repository } from 'typeorm';

@Injectable()
export class SupportService {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    @InjectRepository(SupportChats)
    private readonly supportChatsRepository: Repository<SupportChats>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly messagesService: MessagesService,
  ) {}

  async create(data) {
    const supportUser = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.role = :id', { id: roles.Support as unknown })
      .orderBy('RAND()')
      .limit(1)
      .execute();
    const chat = await this.supportChatsRepository.create({
      supportUser,
      user: data.user,
    });

    await this.messagesRepository.create({ chat, message: data.message });
  }

  async createSupportUser(data: Users): Promise<number> {
    return this.usersRepository.create(data).id;
  }

  async getChats(supportUser: Users): Promise<SupportChats[]> {
    return await this.supportChatsRepository.find({ supportUser });
  }

  async getMessages(data: getMessagesDto) {
    return await this.messagesService.getMessages(data);
    // return this.messagesRepository
    //   .createQueryBuilder('chatRoom')
    //   .where('chatRoom.chat = :id', { id: data })
    //   .orderBy('chatRoom.created_at', 'DESC')
    //   .limit(10)
    //   .skip(data.skip)
    //   .execute();
  }
}
