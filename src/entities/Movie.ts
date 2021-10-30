import  { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('Movie')
export class Movie {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    director: string;

    @Column()
    gender: string;

    @Column()
    rate: number;

    @Column()
    number_of_votes: number;
}