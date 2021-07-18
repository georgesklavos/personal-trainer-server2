import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
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
    avatar: string,
    role: number,
  ): Promise<User> {
    password = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password,
      systemType,
      currency,
      avatar,
      role,
    });

    return await this.userRepository.save(newUser);
  }

  async findUser(emailInput: string): Promise<any> {
    const user = await this.userRepository.findOne({
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
