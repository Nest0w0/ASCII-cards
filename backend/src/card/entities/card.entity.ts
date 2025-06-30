import { Expantion } from "src/expantion/expantion.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    //@Column()
    @ManyToOne(() => Expantion, (expantion) => expantion.cards)
    expantion: Expantion;

    @Column()
    name: string;

    @Column()
    mana: number;

    @Column()
    attack: number;

    @Column()
    health: number;
}
