import { ConflictException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}


    async register({username, email, password}){
        const UserExist = await this.userService.findByEmail(email);
        
        if(UserExist){
            throw new HttpException('This email already exists', 409);
        }

        const crypto = require('node:crypto');

        //Se genera una cadena aleatoria, que será la sal de contraseña de usuario
        const passwordSalt =  crypto.randomBytes(5).toString('hex');

        //La Contraseña + La Sal se pasa por un proceso de Hash
        const passwordHash = crypto.hash('sha1', password + passwordSalt);
        //Este Hash es entonces tratado como la contraseña del usuario, se guardará en la BD y se usará para la autenticación
        //de ahora en adelante
        await this.userService.create({username, email, passwordHash, passwordSalt});

        return {
            message: "User created successfully"
        };
    }

    async login({email, password}){
        /*
        1. get user by email
        2. get the passwordSalt in the response
        3. put the password from the loginDTO + the salt from the User Object into a Hash
        4. Compare the result with the password hash in the User Object
        5. If they coincide, return true. If not, return false.
        */

        const user = await this.userService.findByEmail(email);

        if(!user){
            throw new HttpException('USER_NOT_FOUND', 404);
        }

        const crypto = require('node:crypto');
        const Hash = crypto.hash('sha1', password + user.passwordSalt);
        

        if(Hash === user.passwordHash){
            const payload = {email: user.email, sub: user.id}
            return {accessToken: this.jwtService.sign(payload)};
        }else{
            throw new HttpException('INCORRECT_PASSWORD', 403);
        }
    }
}
