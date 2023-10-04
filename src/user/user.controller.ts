import { Controller, Get } from '@nestjs/common';
import { ApiTags,ApiResponse,ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UserController {
    @Get('me')
    @ApiResponse({status: 200})
    @ApiBadRequestResponse({description: "Bad Request"})
    getMe(){
        return 'return User detail'
    }

}
