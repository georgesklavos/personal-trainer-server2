import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGaurd } from 'src/auth/jwt.auth.gaurd';
import { Owners } from 'src/entities/owners.entity';
import { ErrorException } from 'src/filters/error.exceptions';
import { IsAdmin } from 'src/guards/isAdmin.guard';
import { OwnerService } from 'src/owner/owner.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly ownerService: OwnerService) {}
  private readonly Logger = new Logger(AdminController.name);

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
