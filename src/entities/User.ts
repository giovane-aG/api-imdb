import  { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity("users")
class User {

  @PrimaryColumn()
  readonly id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  // tableName: 'users',
  // columns: {
  //   id: {
  //     primary: true,
  //     type: 'int',
  //     generated: true,
  //   },
  //   name: {
  //     type: 'varchar',
  //   },
  //   email: {
  //     type: 'varchar',
  //   },
  //   password: {
  //     type: 'varchar',
  //   },
  //   isAdmin: {
  //     type: 'int',
  //     default: 0,
  //   }
  // }
}

export default User;