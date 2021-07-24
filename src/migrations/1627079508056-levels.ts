import { levelsSeed } from 'src/seeds/levels.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class levels1627079508056 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('levels')
      .values(levelsSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('levels');
  }
}
