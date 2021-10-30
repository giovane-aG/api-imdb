import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMovieTable1635545526459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'movie',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'rate',
                    type: 'float',
                    isNullable: false,
                    default: 0,
                },
                {
                    name: 'director',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'gender',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'number_of_votes',
                    type: 'int',
                    isNullable: false,
                    default: 0,
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('movie');
    }

}
