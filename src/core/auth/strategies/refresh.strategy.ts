import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Cookie, Payload } from './../../../common';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          let data = request?.cookies[Cookie.Auth];

          if (!data) {
            return null;
          }
          return data.refreshToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('REFRESH_SECRET'),
    });
  }

  public async validate(payload: Payload) {
    if (!payload) {
      throw new UnauthorizedException('Missing refresh jwt');
    }
    return payload;
  }
}
