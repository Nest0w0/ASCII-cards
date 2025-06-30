import { IsNotEmpty, IsString} from 'class-validator';

export class CreateExpantionDto{
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    icon: string;
}