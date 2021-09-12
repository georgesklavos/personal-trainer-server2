import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { extend } from 'dayjs';
import { create } from 'domain';
import { find } from 'rxjs';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';
import { LoginInformation } from 'src/entities/LoginInformation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginInformationService extends BasicCrud {
  constructor(
    @InjectRepository(LoginInformation)
    private readonly loginInformationRepository: Repository<LoginInformation>,
  ) {
    super();
  }

  async create(headerInfo) {
    const loginInfo = this.loginInformationRepository.create(headerInfo);
    this.loginInformationRepository.save(loginInfo);
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
