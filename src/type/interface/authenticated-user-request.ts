import { Request } from 'express';

export interface AuthenticatedUserRequest extends Request {
  user: { user_seq: number; email: string; name: string };
}
