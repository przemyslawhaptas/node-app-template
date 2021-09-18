import knexConfig from './knexfile';

const { env } = process;

const environments = {
  development: {},
  production: {},
  test: {},
  staging: {},
};

const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  knex: knexConfig,
  ...environments[env.NODE_ENV],
};

export default config;
