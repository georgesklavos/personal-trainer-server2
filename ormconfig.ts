import { ConnectionOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const ormconfigMySQL: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrationsTableName: 'migrations',
  migrations: ['dist/**/migrations/*.js'],
  logging: false,
  synchronize: process.env.DB_SYNC == 'true' ? true : false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

// const ormconfigMongoDB: ConnectionOptions = {
//   name: process.env.MONGODB_CONNECTION,
//   type: 'mongodb',
//   host: process.env.MONGODB_HOST,
//   url: process.env.MONGODB_URL,
//   entities: ['dist/**/*.schema.js'],
//   logging: false,
//   useNewUrlParser: true,
//   synchronize: process.env.DB_SYNC == 'true' ? true : false,
// };
const object = { ormconfigMySQL };
export = object;
