import path from "path";
import express from "express";

import { AppDataSource } from "./database/data-source";
import { router } from "./routes";

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

app.listen(process.env.PORT || 5000, () => {
  console.log("Servidor ON na porta 5000");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database started!");
  })
  .catch((error) => console.log(error));
