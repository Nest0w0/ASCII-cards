import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Expantion } from "./expantion.entity";
import { ConflictException, Injectable } from "@nestjs/common";
import { CreateExpantionDto } from "./dto/create-expantion.dto";
import { UpdateExpantionDto } from "./dto/update-expantion.dto";

@Injectable()
export class ExpantionService{
    constructor(
        @InjectRepository(Expantion)
        private readonly expantionRepository: Repository<Expantion>
    ){}

    async create(createExpantionDto: CreateExpantionDto){
        const expantionExist = await this.findByName(createExpantionDto.name);

        if(expantionExist){
            throw new ConflictException("An expantion with this name already exists");
        }

        return this.expantionRepository.save(createExpantionDto);
    }

    findAll(): Promise<Expantion[]>{
        return this.expantionRepository.find();
    }

    findOne(id: number){
        return this.expantionRepository.findOneBy({id});
    }

    findByName(name: string){
        return this.expantionRepository.findOneBy({name});
    }

    update(id: number, updateExpantionDto: UpdateExpantionDto){
        return this.expantionRepository.update({id}, updateExpantionDto);
    }

    delete(id: number){
        return this.expantionRepository.delete({id});
    }
}