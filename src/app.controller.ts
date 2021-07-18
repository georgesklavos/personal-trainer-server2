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
import { User } from './user/user.entity';
import { UserInterceptor } from './user/user.interceptor';
import { UserService } from './user/user.service';

@Controller('api')
@UseInterceptors(UserInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('user')
  async createUser(@Body() user: User) {
    return this.userService.createUser(
      user.email,
      user.password,
      user.systemType,
      user.currency,
      user.avatar,
      user.role,
    );
  }

  @UseGuards(JwtAuthGaurd)
  @Get('user')
  async findUser(@Body('email') email: string) {
    return this.userService.findUser(email);
  }
}
