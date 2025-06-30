import { IsOptional, IsNotEmpty, IsString, IsEmail} from "class-validator";

export class UpdateUserDto {
        
        @IsOptional()
        @IsNotEmpty()
        @IsString()
        username: string;
    
        @IsOptional()
        @IsNotEmpty()
        @IsString()
        @IsEmail()
        email: string;
    
        @IsOptional()
        @IsNotEmpty()
        @IsString()
        passwordHash: string;
}
