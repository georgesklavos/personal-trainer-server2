import { countries } from 'src/seeds/countries.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class countries1631568498533 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('countries')
      .values(countries)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('countries');
  }
}
