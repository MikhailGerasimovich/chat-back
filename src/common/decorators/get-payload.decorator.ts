import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetPayload = createParamDecorator((data: any, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  if (!req.user) {
    return null;
  }

  if (data) {
    return req.user[data];
  }

  return req.user;
});
