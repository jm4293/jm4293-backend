import { Request } from 'express';

export interface AuthenticatedUserRequest extends Request {
  user: { userSeq: number; email: string; name: string };
}
