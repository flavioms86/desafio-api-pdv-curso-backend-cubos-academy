const path = require("path");

const development = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: path.resolve(__dirname, "..", "..", "..", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (connection, done) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

const test = {
  ...development,
  connection: ":memory:",
};

const production = {
  client: "pg",
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  conection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT || 5432),
    ssl: { rejectUnauthorized: false },
  },
};

module.exports = {
  development,
  test,
  production,
};
