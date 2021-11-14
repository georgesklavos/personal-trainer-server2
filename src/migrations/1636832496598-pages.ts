import { pagesSeed } from 'src/seeds/pages.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class pages1636832496598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('pages')
      .values(pagesSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pages');
  }
}
