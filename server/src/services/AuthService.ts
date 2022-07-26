import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, IUser } from 'src/models/User';
import AuthDTO from 'src/dto/AuthDTO';
import Error from 'src/utils/error';
import ReponseData from 'src/utils/response';
import { HTTP_STATUS_OK } from 'src/utils/message';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  async login(dto: AuthDTO): Promise<IUser | Error> {
    const user = await this?.userModel.findOne({ username: dto?.username });
    console.log('User: ', user?.username);
    if (!user) {
      return new Error('Tài khoản không tồn tại', null);
    }

    // check if encrypt pw is ok
    if (comparePassword(dto.password, user?.password)) {
      // generate JWT for user
      const accessToken = await this.jwtService.sign({
        username: user?.username,
      });
      console.log('accessToken', accessToken);
      const payload = {
        accessToken: accessToken,
        user: user,
      };
      return new ReponseData(HTTP_STATUS_OK, null, payload);
    } else {
      return new Error('Tài khoản không tồn tại', null);
    }
  }
}

export default AuthService;
