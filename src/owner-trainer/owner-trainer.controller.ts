import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Macros } from 'src/entities/macros.entity';
import { Users } from 'src/entities/users.entity';
import { MacrosService } from 'src/macros/macros.service';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Controller('owner-trainer')
export class OwnerTrainerController {}
