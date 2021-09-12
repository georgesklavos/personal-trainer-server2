import { roles } from 'src/seeds/roles.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class roles1627079543239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('roles')
      .values(roles)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('roles');
  }
}
