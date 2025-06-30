import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Expantion } from "src/expantion/expantion.entity";


export class UpdateCardDto{
    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    expantion: Expantion;
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    mana: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    attack: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    health: number;
}
