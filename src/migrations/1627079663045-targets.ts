import { targetsSeed } from 'src/seeds/targets.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class targets1627079663045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('targets')
      .values(targetsSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('targets');
  }
}
