import { Model } from 'mongoose';
import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword, IUser } from 'src/models/User';
import AuthDTO from 'src/dto/AuthDTO';
import Error from 'src/utils/error';
import ReponseData from 'src/utils/response';
import systemMessage, { HTTP_STATUS_OK, LOGIN_OK } from 'src/utils/message';
import SignInDTO from 'src/dto/SignInDTO';
import { makeid } from 'src/utils/dataUtils';
import constants from 'src/utils/constants';
import EmailService from './EmailService';
import SmsService from './SmsService';
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
    private emailService: EmailService,
    private smsService: SmsService,
  ) {}

  async signup(dto: SignInDTO): Promise<IUser | Error> {
    const user = await this?.userModel.findOne({
      $or: [{ username: dto.username }, { email: dto.email }],
    });
    if (user) {
      return new Error('Tài khoản hoặc email đã tồn tại', null);
    }

    //  status  = 0, without verified
    const userModel = await this?.userModel.create({
      ...dto,
      username: dto.username.toLocaleLowerCase(),
      uuid: makeid(10),
      authType: constants.AUTH_TYPE.NORMAL,
      role: constants.ROLES.GUEST,
      accountType: constants.ACCOUNT_TYPES.NORMAL,
      createdDate: new Date(),
      updatedDate: new Date(),
      otp: makeid(6),
      status: 0,
    });
    await this?.userModel.init();
    this.smsService.sendSms(userModel);
    return new ReponseData(HTTP_STATUS_OK, null, userModel);
  }

  async signin(dto: AuthDTO): Promise<IUser | Error> {
    console.log('Account: ', dto);
    const user = await this?.userModel.findOne({
      username: dto?.username?.toLocaleLowerCase(),
    });
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
      return new Error('Mật khẩu không hợp lệ', null);
    }
  }

  async signinToken(dto: IUser): Promise<IUser | Error> {
    console.log('Account: ', dto);
    const user = await this?.userModel.findOne({
      username: dto?.username?.toLocaleLowerCase(),
    });
    if (!user) {
      return new Error('Tài khoản không tồn tại', null);
    }

    // check if encrypt pw is ok
    if (dto.password === user.password) {
      // generate JWT for user
      const accessToken = await this.jwtService.sign({
        username: user?.username,
      });
      const payload = {
        accessToken: accessToken,
        user: user,
      };
      return new ReponseData(LOGIN_OK, null, payload);
    } else {
      return new Error('Mật khẩu không hợp lệ', null);
    }
  }

  async verify(userRq: IUser, dto: AuthDTO): Promise<IUser | Error> {
    if (userRq.otp === dto.otp) {
      await this.userModel.findOneAndUpdate(
        { username: userRq.username },
        { status: 2 },
        { upsert: true },
      );
      return new ReponseData(HTTP_STATUS_OK, null, userRq);
    } else {
      return new Error('Mã kích hoạt không hợp lệ', null);
    }
  }

  async getUserFromToken(token: string): Promise<IUser> {
    try {
      const userStr: string | { [key: string]: any } =
        await this.jwtService.decode(token);
      const user = JSON.parse(JSON.stringify(userStr));
      // console.log('new Date().getTime()', new Date().getTime() / 1000);
      if (parseInt(user.exp) < new Date().getTime() / 1000) {
        console.error('Token is expired');
        throw new UnauthorizedException(user, 'TOKEN_IS_EXPIRED');
      }
      const userModel = await this.userModel
        .findOne({
          username: user.username,
        })
        .then((data) => data);
      if (!userModel) {
        throw new UnauthorizedException(user, 'TOKEN_IS_EXPIRED');
      }
      return userModel;
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}

export default AuthService;
