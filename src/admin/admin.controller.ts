import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { Owners } from 'src/entities/owners.entity';
import { Users } from 'src/entities/users.entity';
import { ErrorException } from 'src/filters/error.exceptions';
import { IsAdmin } from 'src/guards/isAdmin.guard';
import { OwnerService } from 'src/owner/owner.service';
import { ownerCreateUpdateDto } from 'src/owner/ownerCreateUpdate.dto';
import { searchResultDto } from 'src/search classes/searchResult.dto';
import { settingsSearchDto } from 'src/search classes/searchSettings.dto';
import { roles } from 'src/seeds/roles.seed';
import { UserInterceptor } from 'src/users/users.interceptor';
import { UserService } from 'src/users/users.service';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}
  private readonly Logger = new Logger(AdminController.name);

  @UseInterceptors(UserInterceptor)
  @Post('/createUser')
  async createUser(@Body() data: ownerCreateUpdateDto) {
    try {
      const user = await this.userService.create(data.user);

      if (user.role.id == roles.Owner) {
        data.owner.user = user;
        await this.ownerService.create(data.owner);
      }

      return user;
    } catch (err) {
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
  @Get('/getUsers')
  async getUsers(
    @Body() settings: settingsSearchDto,
  ): Promise<searchResultDto> {
    try {
      return await this.adminService.getUsers(settings);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }

  @UseGuards(JwtAuthGaurd, IsAdmin)
  @Get('/roleInfo')
  async getRoleInfo(@Body() data: Users) {
    try {
      this.adminService.getRoleInfo(data);
    } catch (err) {
      this.Logger.error(err);
      throw new ErrorException();
    }
  }
}
