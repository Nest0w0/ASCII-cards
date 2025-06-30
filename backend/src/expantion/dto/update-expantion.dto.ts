import { IsNotEmpty, IsOptional, IsString} from "class-validator";

export class UpdateExpantionDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    icon: string;
}