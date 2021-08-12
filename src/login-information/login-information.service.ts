import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInformation } from 'src/entities/LoginInformation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginInformationService {
  constructor(
    @InjectRepository(LoginInformation)
    private readonly loginInformationRepository: Repository<LoginInformation>,
  ) {}

  async loginInfo(headerInfo) {
    const loginInfo = this.loginInformationRepository.create(headerInfo);
    this.loginInformationRepository.save(loginInfo);
  }
}
