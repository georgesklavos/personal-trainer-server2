import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { Messages } from 'src/entities/Messages.entity';
import { SupportChats } from 'src/entities/supportChats.entity';
import { Users } from 'src/entities/users.entity';
import { roles } from 'src/seeds/roles.seed';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { createChatDto } from './createChat.dto';
import { getMessagesDto } from './getMessages.dto';

@Injectable()
export class MessagesService extends BasicCrud {
  constructor(
    @InjectRepository(Messages)
    private readonly messagesRepository: Repository<Messages>,
    @InjectRepository(SupportChats)
    private readonly supportChatsRepository: Repository<SupportChats>,
    private readonly usersService: UserService,
  ) {
    super();
  }

  async create(data: createChatDto): Promise<number> {
    this.usersService.checkRole(data.supportUser, [roles.Support]);
    this.usersService.checkRole(data.user, [roles.Client]);

    return await this.supportChatsRepository.create(data).id;
  }

  find() {
    //nothing
  }

  async findChatsBySupportUser(supportUser: Users): Promise<SupportChats[]> {
    this.usersService.checkRole(supportUser, [roles.Support]);

    return await this.supportChatsRepository.find({ where: { supportUser } });
  }

  async findChatsByUser(user: Users): Promise<SupportChats[]> {
    this.usersService.checkRole(user, [roles.Support]);

    return await this.supportChatsRepository.find({ where: { user } });
  }

  async getMessages(data: getMessagesDto): Promise<Messages[]> {
    const chatData = await this.supportChatsRepository.findOne({
      where: { id: data.chat.id },
    });

    if (chatData.user != data.user && chatData.supportUser != data.user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user in chat',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.messagesRepository.find({
      select: ['message', 'created_at'],
      order: { created_at: 'DESC' },
    });
  }

  update() {
    //nothing
  }

  delete(messageId: Messages) {
    this.messagesRepository.delete({ id: messageId.id, deleted: false });
  }
}
