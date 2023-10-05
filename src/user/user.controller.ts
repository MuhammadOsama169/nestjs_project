import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags,ApiResponse,ApiBadRequestResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import {Request} from 'express'

@ApiTags("users")
@Controller('users')
    export class UserController {
        // /users/me
        @UseGuards(JwtGuard)
        @Get('me')
        //nest swagger
        @ApiResponse({status: 200})
        @ApiBadRequestResponse({description: "Bad Request"})

        getMe(@Req() req:Request){
            return req.user
        }

    }
