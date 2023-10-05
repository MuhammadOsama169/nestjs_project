/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(
    config:ConfigService,
    private prisma:PrismaService
    ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload:{sub:number,email:string,}){
    // console.log({payload})
    const user = this.prisma.user.findUnique({
      where:{
        id:payload.sub
      }
    })
    return user
  }

}