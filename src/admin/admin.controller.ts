import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { Owners } from 'src/entities/owners.entity';
import { ErrorException } from 'src/filters/error.exceptions';
import { IsAdmin } from 'src/guards/isAdmin.guard';
import { OwnerService } from 'src/owner/owner.service';
import { ownerCreateUpdateDto } from 'src/owner/ownerCreateUpdate.dto';
import { UserInterceptor } from 'src/users/users.interceptor';
import { UserService } from 'src/users/users.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly userService: UserService,
  ) {}
  private readonly Logger = new Logger(AdminController.name);

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
  // Create in the app controller update api for all the roles but the same api and change the data for each role
  @UseGuards(JwtAuthGaurd, IsAdmin)
  @Get('/getOwners')
  async getOwners(): Promise<Owners[]> {
    try {
      return await this.ownerService.getOwners();
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }
}
