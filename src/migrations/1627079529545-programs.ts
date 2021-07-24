import { programsSeed } from 'src/seeds/programs.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class programs1627079529545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('programs')
      .values(programsSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('programs');
  }
}
