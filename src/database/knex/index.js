const { knex } = require("knex");
const pg = require("pg");

const { development, production, test } = require("./Environment");

if (process.env.DB_ENVIRONMENT === "production") {
  pg.types.setTypeParser(20, "text", parseInt);
}

const getEnvironment = () => {
  switch (process.env.DB_ENVIRONMENT) {
    case "production":
      return production;
    case "test":
      return test;
    default:
      return development;
  }
};

const Knex = knex(getEnvironment());

module.exports = Knex;
