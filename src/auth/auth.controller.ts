import { Controller, Post,Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags,ApiResponse,ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthTypes } from './types/index';

@ApiTags("auth")
@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  //nest swagger
  @ApiResponse({status: 200})
  @ApiBadRequestResponse({description: "Bad Request"})

  signup(@Body() dto:AuthTypes){
      return this.authService.signup(dto)
  }
  @Post('signin')
  //nest swagger
  @ApiResponse({status: 200})
  @ApiBadRequestResponse({description: "Bad Request"})

  signin(@Body() dto:AuthTypes){
      req.user
      return this.authService.signin(dto)
  }
}
