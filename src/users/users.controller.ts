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
export class UserController {}
