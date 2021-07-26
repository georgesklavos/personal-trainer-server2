import { usersSeed } from 'src/seeds/users.seed';
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';

export class usersAdmin1627321719597 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into('users')
      .values(usersSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
