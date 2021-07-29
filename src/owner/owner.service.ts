import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Owners } from '../entities/owners.entity';
import { Repository } from 'typeorm';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owners)
    private readonly ownersRepository: Repository<Owners>,
  ) {}

  async createOwner(
    user: Users,
    phone: string,
    clients: number,
    trainers: number,
    active: boolean,
  ): Promise<Owners> {
    const newOwner = await this.ownersRepository.create({
      user,
      phone,
      clients,
      trainers,
      active,
    });

    await validate(newOwner).catch((errors) => {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid owner information',
        },
        HttpStatus.BAD_REQUEST,
      );
    });

    return await this.ownersRepository.save(newOwner);
  }

  async findOwnerByUserId(userId): Promise<Owners> {
    const owner = await this.ownersRepository.findOne({ user: userId });

    return owner;
  }
}
