import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ){}


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
