import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags,ApiResponse,ApiBadRequestResponse } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorators/index';
import { User } from '@prisma/client';

@ApiTags("users")
@UseGuards(JwtGuard)
@Controller('users')
    export class UserController {
        // /users/me
        @Get('me')
        //nest swagger
        @ApiResponse({status: 200})
        @ApiBadRequestResponse({description: "Bad Request"})

        getMe(@GetUser() user:User){
            return user
        }

    }
