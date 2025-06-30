import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>
  ){}

  async create(createCardDto: CreateCardDto) {
    const cardExist = await this.findByName(createCardDto.name);

    if (cardExist){
      throw new ConflictException("A card with this name already exists");
    }

    return this.cardRepository.save(createCardDto);
  }

  findAll() {
    return this.cardRepository.find({relations:{expantion: true}});
  }

  findOne(id: number) {
    //return this.cardRepository.findOneBy({id});
    return this.cardRepository.findOne({relations: {expantion:true}, where: {id}});
  }

  findByName(name: string){
    return this.cardRepository.findOneBy({name});
  }

  findAllByExpantion(expantionId: number){
    /*
    return this.cardRepository.find({
      relations:{expantion: true}, 
      where: {expantion: {
        id: expantionId
        }
      }}
    );
    */
    return this.cardRepository.createQueryBuilder('card').leftJoinAndSelect('card.expantion', 'expantion').where('card.expantionId = :expantionId', {expantionId: expantionId}).getMany();
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return this.cardRepository.update({id}, updateCardDto);
  }

  remove(id: number) {
    return this.cardRepository.delete({id});
  }
}
