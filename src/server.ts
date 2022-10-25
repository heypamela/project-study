import "reflect-metadata";
import path from "path";
import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";

import { AppDataSource } from "./database/data-source";
import { router } from "./routes";
import { container } from "./config/container";
import "./controllers/UserController";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(router);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers");
  res.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,OPTIONS,PATCH"
  );
  res.send("send some thing whatever");
});

//app.listen(process.env.PORT || 5000, () => {
//  console.log("Servidor ON na porta 5000");
//});

const server = new InversifyExpressServer(
  container,
  null,
  { rootPath: "/api" },
  app
);

const appConfigured = server.build();
const serve = appConfigured.listen(
  process.env.PORT || 5000,
  () => `App running on ${serve.address().port}`
);

AppDataSource.initialize()
  .then(() => {
    console.log("Database started!");
  })
  .catch((error) => console.log(error));
