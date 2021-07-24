import { exerciseOptionsSeed } from 'src/seeds/exerciseOptions.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class exerciseOptions1627079463819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('exercise_options')
      .values(exerciseOptionsSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exercise_options');
  }
}
