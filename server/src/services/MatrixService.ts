import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from 'src/models/User';

@Injectable()
export class MatrixService {
  async getMatrix(type): Promise<string[] | Error> {
    return [];
  }
}

export default MatrixService;
