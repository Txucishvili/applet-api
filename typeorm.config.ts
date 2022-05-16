import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'applet',
  autoLoadEntities: true,
  synchronize: false,
  /* Note : it is unsafe to use synchronize: true for schema synchronization
  on production once you get data in your database. */
  // synchronize: true,
}

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: "migrations",
  migrations: ["src/db/migrations/*.ts"],
  cli: {
    "migrationsDir": "src/migrations"
  }
};
export default OrmConfig;