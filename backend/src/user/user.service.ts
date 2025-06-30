import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {

    const userExist = await this.findByUsername(createUserDto.username);
    
    if (userExist){
      throw new ConflictException("This username already exists");
    }

    const crypto = require('node:crypto');
  
    //Se genera una cadena aleatoria, que será la sal de contraseña de usuario
    createUserDto.passwordSalt = crypto.randomBytes(5).toString('hex');

    //La Contraseña + La Sal se pasa por un proceso de Hash
    const passwordHash = crypto.hash('sha1', createUserDto.passwordHash + createUserDto.passwordSalt);
    createUserDto.passwordHash = passwordHash;
    //Este Hash es entonces tratado como la contraseña del usuario, se guardará en la BD y se usará para la autenticación
    //de ahora en adelante

    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  findByUsername(username: string){
    return this.userRepository.findOneBy({username});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({id}, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }
}
