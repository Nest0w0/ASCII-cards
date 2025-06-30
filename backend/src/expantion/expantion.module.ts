import {Module} from '@nestjs/common';
import {ExpantionController} from './expantion.controller';
import { ExpantionService } from './expantion.service';
import { Expantion } from './expantion.entity';
import {TypeOrmModule} from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([Expantion])],
    controllers: [ExpantionController],
    providers: [ExpantionService]
})

export class ExpantionModule{}