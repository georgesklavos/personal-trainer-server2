import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  getAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async getOneById(id: number): Promise<Users> {
    try {
      const user = await this.usersRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async createUser(
    email: string,
    password: string,
    systemType: number,
    currency: number,
    language: string,
  ): Promise<Users> {
    password = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      email,
      password,
      systemType,
      currency,
      language,
    });

    await validate(newUser).then((errors) => {
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

  //   updateUser(
  //     id: number,
  //     email: string,
  //     password: string,
  //     systemType: number,
  //     currency: number,
  //     avatar: string,
  //     role: number,
  //   ): Promise<User> {
  //     const user = this.getOneById(id);

  //     user.email = email;

  //     return this.userRepository.save(user);
  //   }
}