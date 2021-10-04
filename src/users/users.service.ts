import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Users } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { Systems } from 'src/entities/systems.entity';
import { Languages } from 'src/entities/languages.entity';
import { Genders } from 'src/entities/genders.entity';
import { Roles } from 'src/entities/roles.entity';
import { BasicCrud } from 'src/abstractClasses/basicCrudOperations';

@Injectable()
export class UserService extends BasicCrud {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {
    super();
  }

  find(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async getOneById(id: Users): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async create(userData: Users): Promise<Users> {
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = await this.usersRepository.create(userData);

    await validate(newUser).catch((errors) => {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Invalid user information',
        },
        HttpStatus.BAD_REQUEST,
      );
    });

    return await this.usersRepository.save(newUser);
  }

  async findUser(emailInput: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      email: emailInput,
    });
    return user;
  }

  async update(userData: Users): Promise<UpdateResult> {
    // let user = await this.getOneById(id);
    const user = await this.usersRepository.update(
      { id: userData.id },
      userData,
    );
    // user = { ...user, ...userData };

    return user;
  }

  async checkRole(user: Users, roles: [number]) {
    const userData = await this.usersRepository.findOne({
      where: { id: user },
    });

    if (!roles.includes(userData.role.id)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Invalid role',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  delete() {
    //nothing
  }
}
