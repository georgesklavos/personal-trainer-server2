import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Owners } from 'src/entities/owners.entity';
import { Roles } from 'src/entities/roles.entity';
import { Trainers } from 'src/entities/trainers.entity';
import { ErrorException } from 'src/filters/error.exceptions';
import { OwnerService } from 'src/owner/owner.service';
import { roles } from 'src/seeds/roles.seed';
import { TrainerService } from 'src/trainer/trainer.service';
import { updateProfileDto } from './updateProfile.dto';
import { UserService } from './users.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly trainerService: TrainerService,
    private readonly ownerService: OwnerService,
    private readonly clientService: ClientService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Put('update')
  updateProfile(@Request() req, @Body() body: updateProfileDto) {
    try {
      if (req.user.id != body.user.id) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Invalid user',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      this.userService.updateUser(body.user);
      switch (body.user.role.id) {
        case roles.Owner:
          this.ownerService.updateOwner(body.role as Owners);
          break;
        case roles.Trainer:
          this.trainerService.updateTrainer(body.role as Trainers);
          break;
        case roles.Client:
          this.clientService.updateClient(body.role as Clients);
          break;
      }
    } catch (err) {
      throw new ErrorException();
    }
  }
}
