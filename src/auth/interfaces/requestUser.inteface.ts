import { Request } from 'express';

export interface JwtPayload {
  email: string;
  id: number;
}
export interface RequestUser extends Request {
  user: JwtPayload;
}
