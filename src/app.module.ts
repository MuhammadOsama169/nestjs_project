import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule,ConfigModule.forRoot({isGlobal:true}),AuthModule,UserModule],
})
export class AppModule {}
