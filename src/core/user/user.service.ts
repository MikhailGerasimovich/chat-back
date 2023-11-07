import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto, FindAllUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findAll(findAllUserDto: FindAllUserDto): Promise<User[]> {
    const filter = this.getFindAllFilter(findAllUserDto);
    return await this.userModel.find(filter);
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel({ _id: uuidv4(), ...createUserDto });
    return await this.userModel.create(user);
  }

  private getFindAllFilter(findAllUserDto: FindAllUserDto) {
    const filter = {};
    if (findAllUserDto.username) {
      filter['username'] = { $regex: `.*${findAllUserDto.username}.*` };
    }
    return filter;
  }
}
