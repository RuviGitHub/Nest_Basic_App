import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column('decimal')
    amount: number;

    @Column()
    date: string;

    @Column()
    category: string;
}