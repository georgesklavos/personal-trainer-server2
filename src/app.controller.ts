import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { LoginInformationService } from './login-information/login-information.service';
import { UserInterceptor } from './users/users.interceptor';
import { UserService } from './users/users.service';

@Controller()
@UseInterceptors(UserInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly loginInformationService: LoginInformationService,
  ) {}
  //Vale tin diadikasia twn ips se allo service
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    // this.loginInformationService.loginInfo({
    //   user: req.user.id,
    //   ip: req.ip,
    //   device: req.headers['user-agent'],
    // });
    return this.authService.login(req.user);
  }
}
