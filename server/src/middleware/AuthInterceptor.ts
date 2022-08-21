import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';
import AuthService from 'src/services/AuthService';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private service: AuthService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    // console.log(
    //   `${new Date()} | AuthInterceptor -  New request to route: ${
    //     request.originalUrl
    //   }`,
    // );
    // const item =
    //   await this.authService.getByToken(/* extract me from headers*/);
    //   (request.user = item);

    return next
      .handle()
      .pipe(catchError((err) => throwError(() => new BadGatewayException())));
  }
}

export default AuthInterceptor;
