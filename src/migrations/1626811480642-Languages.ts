import { LanguagesSeed } from '../seeds/languages.seeds';
import {
  getRepository,
  MigrationInterface,
  QueryRunner,
  Table,
  createQueryBuilder,
  getConnection,
  TableIndex,
} from 'typeorm';

export class Languages1626811480642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'languages',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'iso',
            type: 'char',
            length: '2',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'languages',
      new TableIndex({
        name: 'languageId',
        columnNames: ['id'],
      }),
    );

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('languages')
      .values(LanguagesSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('languages');
  }
}
