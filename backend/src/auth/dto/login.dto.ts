import { isEmail, isString } from "class-validator";


export class LoginDto{
    email: string;

    password: string;
}