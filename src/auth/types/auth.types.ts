import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthTypes {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
