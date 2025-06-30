import { Max } from 'class-validator';
import { Card } from 'src/card/entities/card.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Expantion{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon: string;

    @OneToMany(() => Card, (card) => card.expantion)
    cards: Card[];
}