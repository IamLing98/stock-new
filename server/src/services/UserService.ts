import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/models/User';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  async create(dto: IUser): Promise<IUser> {
    const entity = new this.userModel(dto);
    return entity.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
}

export default UserService;
