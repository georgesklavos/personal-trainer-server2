import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginInformation } from 'src/entities/LoginInformation.entity';
import { LoginInformationService } from './login-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoginInformation])],
  providers: [LoginInformationService],
  exports: [LoginInformationService],
})
export class LoginInformationModule {}
