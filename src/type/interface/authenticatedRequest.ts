import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { user_seq: number; email: string; name: string };
}
