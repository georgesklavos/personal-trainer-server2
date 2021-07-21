import { genderSeed } from '../seeds/gender.seed';
import {
  getConnection,
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class Genders1626892489296 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'genders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'value',
            type: 'varchar',
            length: '10',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'genders',
      new TableIndex({ name: 'gendersId', columnNames: ['id'] }),
    );

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('genders')
      .values(genderSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('genders');
  }
}
