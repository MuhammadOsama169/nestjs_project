import { Injectable,ForbiddenException } from "@nestjs/common";
import { AuthTypes } from "./types";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class AuthService {
constructor (
    private prisma:PrismaService,
     private jwt:JwtService,
     private config:ConfigService){}

    async signup(dto:AuthTypes){
        try{
            const argon = argon2
            // hash the password
            const hash = await argon.hash(dto.password)
            // add user to db
            const user = await this.prisma.user.create({
                data:{
                    email:dto.email,
                    hash
                }
            })
            
        return this.signToken(user.id, user.email)

        }catch(err){
            if(err instanceof PrismaClientKnownRequestError){
                if(err.code === 'P2002'){
                    throw new ForbiddenException ('Credentials taken')
                }
            }
        }
    }

    async signin(dto:AuthTypes){

        //find user from db
        const user = await this.prisma.user.findUnique({
            where:{email:dto.email}
        })
        //if user does not exist throw exception
        if(!user){
            throw new ForbiddenException('user not found')
        }
        //check correct pwd
        const pwdMatches = await argon2.verify(user.hash, dto.password)

        if(!pwdMatches){
            throw new ForbiddenException('Invalid password')
        }

        return this.signToken(user.id, user.email)
    }

    async signToken(userId:number, email:string):Promise<{access_token:string}>{
        const payload = {
            sub:userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(
            payload, {expiresIn:'1d',secret:secret}
        )
        return {
            access_token:token
        }

    }
}

