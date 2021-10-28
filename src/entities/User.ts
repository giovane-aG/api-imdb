import  { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity("user")
export class User {

  @PrimaryColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  active: boolean;
}