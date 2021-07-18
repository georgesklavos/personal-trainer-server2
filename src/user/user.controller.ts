import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
// import { AuthService } from 'src/auth/auth.service';
// // import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
// import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
// import { User } from './user.entity';
// import { UserService } from './user.service';

@Controller('user')
export class UserController {
  // constructor(
  //   private readonly userService: UserService,
  //   private readonly authService: AuthService,
  // ) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // login(@Request() req): any {
  //   return this.authService.login(req.user);
  // }

  // // @UseGuards(JwtAuthGaurd)
  // @Post()
  // async createUser(@Body() user: User): Promise<User> {
  //   return this.userService.createUser(
  //     user.email,
  //     user.password,
  //     user.systemType,
  //     user.currency,
  //     user.avatar,
  //     user.role,
  //   );
  // }
}
