require("dotenv").config();
const express = require("express");
const router = require("./routers/router");

const PORT = process.env.PORT;

const server = express();

server.use(express.json());
server.use(router);

server.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
