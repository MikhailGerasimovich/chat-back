import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Cookie } from './../../../common';

export const GetToken = createParamDecorator((data: any, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  const jwts = req?.cookies[Cookie.Auth];
  if (!jwts) {
    return null;
  }
  return jwts.refreshToken;
});
