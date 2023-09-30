import { Controller, Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags,ApiResponse,ApiBadRequestResponse } from '@nestjs/swagger';
import { AuthTypes } from './types/index';

@ApiTags("auth")
@Controller('auth')

export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')

  @ApiResponse({status: 200})
  @ApiBadRequestResponse({description: "Bad Request"})

  signup(@Body() dto:AuthTypes){
    console.log({dto})
      return this.authService.signup()
  }
  @Post('signin')
  @ApiResponse({status: 200})
  @ApiBadRequestResponse({description: "Bad Request"})

  signin(){
      return this.authService.signin()
  }
}
