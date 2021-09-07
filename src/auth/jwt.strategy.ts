import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { userAuthInfo } from './userAuthInfo.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_JWT,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any): Promise<userAuthInfo> {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
