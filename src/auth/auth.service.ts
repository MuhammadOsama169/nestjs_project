import { Injectable } from "@nestjs/common";
import { AuthTypes } from "./types";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()

export class AuthService {

    constructor (private prisma:PrismaService){}
    async signup(dto:AuthTypes){
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
        // return user
        return user
    }
    signin(){
        return 'Sign In'
    }
}