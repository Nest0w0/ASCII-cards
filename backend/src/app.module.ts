import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpantionModule } from './expantion/expantion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expantion } from './expantion/expantion.entity';
import { CardModule } from './card/card.module';
import { Card } from './card/entities/card.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    
    ExpantionModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'cardgame-backend',
      entities: [Expantion, Card, User],
      synchronize: true,
    }),
    CardModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
