import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { Owners } from '../entities/owners.entity';
import { Users } from '../entities/users.entity';
import { OwnerService } from '../owner/owner.service';
import { UserInterceptor } from './users.interceptor';
// import { AuthService } from 'src/auth/auth.service';
// // import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
// import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
// import { User } from './user.entity';
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly ownerService: OwnerService,
  ) {}
  @UseInterceptors(UserInterceptor)
  @Post('signup')
  async signup(@Body() body: Users & Owners) {
    try {
      const user = await this.userService.createUser(
        body.firstName,
        body.lastName,
        body.email,
        body.password,
        body.currency,
        body.gender,
        body.systemType,
        body.language,
        body.role,
      );

      await this.ownerService.createOwner(
        user,
        body.phone,
        body.clients,
        body.trainers,
        body.active,
      );
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
}
