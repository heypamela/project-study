import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [`${__dirname}/**/models/*.{ts, js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts, js}`],
});
