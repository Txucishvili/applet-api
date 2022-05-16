import { Migration, DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'applet',
  synchronize: false,
  migrations: ['src/db/migrations/*.{js,ts}'],
  entities: ["src/**/*.entity.ts"],
  migrationsTableName: "migrations-name"
});


export default dataSource;