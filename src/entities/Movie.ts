import  { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Movie')
export class Movie {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    rate: number;

    @Column()
    number_of_votes: number;
}