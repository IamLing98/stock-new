import { Request, Response, NextFunction } from 'express';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //   console.log(
  //     `${new Date()} | AuthMiddleware -  New request to route: ${
  //       req.originalUrl
  //     }`,
  //   );
  next();
};

export default AuthMiddleware;
