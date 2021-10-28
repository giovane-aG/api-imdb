import  { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity("user")
export class User {

  @PrimaryColumn()
  readonly id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;
}