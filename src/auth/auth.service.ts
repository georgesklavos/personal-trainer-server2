import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginInformation } from 'src/entities/LoginInformation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(LoginInformation)
    private readonly logiInformationRepository: Repository<LoginInformation>,
  ) {}
  private readonly Logger = new Logger(AuthService.name);

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUser(email);
      const match = await bcrypt.compare(password, user.password);

      if (user && match) {
        const { password, username, ...rest } = user;
        return rest;
      }
    } catch (err) {
      return null;
    }
  }

  async login(user: any, headerInfo) {
    const loginInfo = this.logiInformationRepository.create(headerInfo);
    this.logiInformationRepository.save(loginInfo);
    const payload = { email: user.email, sub: user.id };
    this.Logger.log(`User with id "${payload.sub}" has been authorized`);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
