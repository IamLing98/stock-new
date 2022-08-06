import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import AuthService from 'src/services/AuthService';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //   console.log(
  //     `${new Date()} | AuthMiddleware -  New request to route: ${
  //       req.originalUrl
  //     }`,
  //   );
  next();
};

export default AuthMiddleware;
