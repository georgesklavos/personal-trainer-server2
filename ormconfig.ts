import { ConnectionOptions } from 'typeorm';
import { Users } from './src/users/users.entity';

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Users],
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  synchronize: process.env.DB_SYNC == 'true' ? true : false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
