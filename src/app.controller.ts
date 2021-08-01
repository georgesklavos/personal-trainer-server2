import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { Users } from './entities/users.entity';
import { UserInterceptor } from './users/users.interceptor';
import { UserService } from './users/users.service';

@Controller('api')
@UseInterceptors(UserInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  //Vale tin diadikasia twn ips se allo service
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    console.log(req.headers['user-agent']);
    return this.authService.login(req.user, {
      user: req.user.id,
      ip: req.ip,
      device: req.headers['user-agent'],
    });
  }
}
