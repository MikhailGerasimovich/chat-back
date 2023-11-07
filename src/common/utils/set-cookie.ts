import { Response } from 'express';

export function setCookie(res: Response, name: string, data: any): void {
  res.cookie(name, data, { httpOnly: true, sameSite: true });
}
