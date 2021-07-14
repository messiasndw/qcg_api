import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "APP_SECRET",
    });
  }

  async validate(payload: any) {
    const {iat, exp, ...rest} = payload
    const user = await this.userService.me(payload.id)
    if(!user){
      throw new UnauthorizedException()  
    }
    return user.toJSON()
  }
}