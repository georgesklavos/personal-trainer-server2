import { systemsSeed } from 'src/seeds/systems.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class systems1627079555925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('systems')
      .values(systemsSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('systems');
  }
}
