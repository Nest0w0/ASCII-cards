import { IsEmail, IsNotEmpty, IsString, registerDecorator, ValidateByOptions, ValidationOptions } from "class-validator";
import { UserService } from "../user.service";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    passwordHash: string;

    //@IsNotEmpty()
    //@IsString()
    passwordSalt: string;
}