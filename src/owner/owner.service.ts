import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Owners } from '../entities/owners.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Users } from 'src/entities/users.entity';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';

@Injectable()
export class OwnerService extends BasicCrud {
  constructor(
    @InjectRepository(Owners)
    private readonly ownersRepository: Repository<Owners>,
  ) {
    super();
  }

  async create(ownerData: Owners): Promise<Owners> {
    const newOwner = await this.ownersRepository.create(ownerData);

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

  async find(): Promise<Owners[]> {
    return await this.ownersRepository.find({ relations: ['user'] });
  }

  async update(data: Owners): Promise<UpdateResult> {
    return await this.ownersRepository.update({ user: data.user }, data);
  }

  delete() {
    //nothing
  }
}
