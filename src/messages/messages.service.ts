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
    const supportUser = await this.usersService.getOneById(data.supportUser);

    if (supportUser.role.id != roles.Support) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid support user',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.usersService.getOneById(data.user);
    if (user.role.id != roles.Client) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid client',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.supportChatsRepository.create(data).id;
  }

  find() {
    //nothing
  }

  update() {
    //nothing
  }

  delete() {
    //nothing
  }
}
