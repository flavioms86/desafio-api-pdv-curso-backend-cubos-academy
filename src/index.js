require("dotenv").config();
const express = require("express");
const router = require("./routers/router");
const Knex = require("./database/knex/index");

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use(router);

const startServer = () => {
  server.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
  });
};

if (process.env.IS_LOCALHOST !== "true") {
  console.log("Rodando migrations");

  Knex.migrate
    .latest()
    .then(() => {
      Knex.seed
        .run()
        .then(() => startServer())
        .catch(console.log);
    })
    .catch(console.log);
} else {
  startServer();
}
