const { loadEnvConfig } = require('@next/env');

const dev = process.env.NODE_ENV !== 'production';
const { PG_URI } = loadEnvConfig('./', dev).combinedEnv;

console.log(PG_URI);

module.exports = {
  client: 'pg',
  connection: PG_URI,
  migrations: {
    directory: './knex/migrations',
  },
  seeds: {
    directory: './knex/seeds',
  },
};
