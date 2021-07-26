import path from 'path';

const { env } = process;

const config = {
  client: 'pg',
  connection: env.NODE_ENV === 'test' ? env.DATABASE_URL_TEST : env.DATABASE_URL,
  migrations: {
    directory: path.join(__dirname, '../src/infra/db/migrations'),
  },
};

export default config;
