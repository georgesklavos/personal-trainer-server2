import { exerciseModesSeed } from 'src/seeds/exerciseModes.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class exerciseModes1627079479919 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('exercise_modes')
      .values(exerciseModesSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exercise_modes');
  }
}
