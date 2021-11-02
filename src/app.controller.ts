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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { JwtAuthGaurd } from './auth/jwt.auth.gaurd';
import { ClientService } from './client/clients.service';
import { EmailService } from './email/email.service';
import { Clients } from './entities/clients.entity';
import { Owners } from './entities/owners.entity';
import { Trainers } from './entities/trainers.entity';
import { customErrorMessage, ErrorException } from './filters/error.exceptions';
import { LoginInformationService } from './login-information/login-information.service';
import { OwnerService } from './owner/owner.service';
import { ownerCreateUpdateDto } from './owner/ownerCreateUpdate.dto';
import { roles } from './seeds/roles.seed';
import { TrainerService } from './trainer/trainer.service';
import { updateProfileDto } from './users/updateProfile.dto';
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
    private readonly trainerService: TrainerService,
    private readonly clientService: ClientService,
    private readonly emailsService: EmailService,
  ) {}

  @ApiTags('Athentication')
  @ApiCreatedResponse({ description: 'User registration' })
  @UseInterceptors(UserInterceptor)
  @Post('signup')
  async signup(@Body() data: ownerCreateUpdateDto) {
    try {
      const user = await this.userService.create(data.user);
      data.owner.user = user;
      await this.ownerService.create(data.owner);
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

  @ApiTags('Athentication')
  @ApiOkResponse({ description: 'User login' })
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

  @ApiTags('Mutual')
  @ApiOkResponse({ description: 'Update user info' })
  @UseGuards(LocalAuthGuard)
  @Put('update')
  updateProfile(@Request() req, @Body() body: updateProfileDto) {
    try {
      if (req.user.id != body.user.id) {
        throw new customErrorMessage('Invalid user', HttpStatus.BAD_REQUEST);
      }
      this.userService.update(body.user);
      switch (body.user.role.id) {
        case roles.Owner:
          this.ownerService.update(body.role as Owners);
          break;
        case roles.Trainer:
          this.trainerService.update(body.role as Trainers);
          break;
        case roles.Client:
          this.clientService.update(body.role as Clients);
          break;
      }
    } catch (err) {
      throw new ErrorException();
    }
  }

  @ApiTags('Mutual')
  @ApiOkResponse({ description: 'Verify user email' })
  @UseGuards(JwtAuthGaurd)
  @Post('verifyEmail')
  async sendEmail(@Request() req) {
    // const user = await this.userService.getOneById(req.user.id);
    // console.log(user);
    return this.emailsService.sendVerifyEmail(req.user);
  }
}
