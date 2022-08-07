import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import AuthService from 'src/services/AuthService';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private service: AuthService) {}

  async validateAuthFromRequest(request) {
    const headers = request.headers;
    const token = headers.authorization;
    if (!token) return false;
    const user = await this.service
      .getUserFromToken(token?.substring(7, token?.length))
      .then((data) => data);
    if (!user) {
      return false;
    }
    return user;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(
    //   `${new Date()} | AuthGuard -  New request to route: ${
    //     request.originalUrl
    //   }`,
    // );
    if (
      request.originalUrl !== '/auth/signin' &&
      request.originalUrl !== '/auth/signup'
    ) {
      return this.validateAuthFromRequest(request).then((user) => {
        if (!user) {
          return false;
        }
        request.user = user;
        return true;
      });
    }
    return true;
  }
}

export default AuthGuard;
