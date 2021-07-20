import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly Logger = new Logger(AuthService.name);
  
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUser(email);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.email, sub: user.id };
    this.Logger.log(`User with id "${payload.sub}" has been authorized`);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
