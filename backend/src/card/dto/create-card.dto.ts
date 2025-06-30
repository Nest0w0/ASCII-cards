import { IsNumber, IsNotEmpty, IsString, Min} from "class-validator";
import { Expantion } from "src/expantion/expantion.entity";

/*
    TODO: 
    -Checkear que no se introduzca una carta que ya exisste
    -Checkear que no se introduzca una carta con una expansión que no existe aún (Está dando error pero hay que manejarlo de antes)
*/


export class CreateCardDto {
    
    @IsNotEmpty()
    @IsNumber()
    expantion: Expantion;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, {message: "El maná de una carta no puede ser negativo"})
    mana: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, {message: "El ataque de una carta no puede ser negativo"})
    attack: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0, {message: "La vida de una carta no puede ser negativa"})
    health: number;
}
