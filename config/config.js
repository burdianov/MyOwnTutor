require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const node_env = process.env.NODE_ENV;

const config = {
  dev: {
    db: {
      username,
      password,
      database,
      host
    }
  },
  test: {},
  prod: {}
};

module.exports = config[node_env];