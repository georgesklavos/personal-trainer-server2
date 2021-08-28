import { Controller, Get, Logger } from '@nestjs/common';
import { Owners } from 'src/entities/owners.entity';
import { ErrorException } from 'src/filters/error.exceptions';
import { OwnerService } from 'src/owner/owner.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly ownerService: OwnerService) {}
  private readonly Logger = new Logger(AdminController.name);

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
