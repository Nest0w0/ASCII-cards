import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule} from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'secreto',
      signOptions: {expiresIn: '1d'}
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})

export class AuthModule {}
