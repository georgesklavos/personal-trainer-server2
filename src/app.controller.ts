import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  Body,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { LoginInformationService } from './login-information/login-information.service';
import { OwnerService } from './owner/owner.service';
import { ownerCreateUpdateDto } from './owner/ownerCreateUpdate.dto';
import { UserInterceptor } from './users/users.interceptor';
import { UserService } from './users/users.service';

@Controller()
@UseInterceptors(UserInterceptor)
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly ownerService: OwnerService,
    private readonly loginInformationService: LoginInformationService,
  ) {}

  @UseInterceptors(UserInterceptor)
  @Post('signup')
  async signup(@Body() data: ownerCreateUpdateDto) {
    try {
      const user = await this.userService.createUser(data.user);
      data.owner.user = user;
      await this.ownerService.createOwner(data.owner);
      return user;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user information',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

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
