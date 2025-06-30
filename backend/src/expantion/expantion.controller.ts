import { Body, Controller, Post, Get, Param, Patch, UsePipes, ValidationPipe, Delete} from '@nestjs/common'
import { ExpantionService } from "./expantion.service";
import { CreateExpantionDto } from './dto/create-expantion.dto';
import { UpdateExpantionDto } from './dto/update-expantion.dto';

@Controller('Expantion')
export class ExpantionController{
    constructor(private readonly expantionService: ExpantionService){}

    //Hacer el service primero
    @Post()
    create(@Body() createExpantionDto: CreateExpantionDto){
        return this.expantionService.create(createExpantionDto);
    }

    @Get()
    findAll(){
        return this.expantionService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: String){
        return this.expantionService.findOne(+id);
    }

    @Patch(':id')
    @UsePipes(ValidationPipe)
    update(@Param('id') id: String, @Body() updateExpantionDto: UpdateExpantionDto){
        return this.expantionService.update(+id, updateExpantionDto);
    }

    @Delete(':id')
    delete(@Param('id') id: String){
        return this.expantionService.delete(+id);
    }
}