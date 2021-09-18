import knexCleaner from 'knex-cleaner';

import config from 'config';
import constructDb from 'src/infra/db';

const { env } = process;

const constructTestDb = () => {
  // eslint-disable-next-line fp/no-throw
  if (env.NODE_ENV !== 'test') throw new Error('Cannot be used outside of test environment!');

  return constructDb({ config });
};

const cleanUpDb = (db) => {
  const options = {
    mode: 'truncate',
    restartIdentity: true,
    ignoreTables: [
      'knex_migrations',
      'knex_migrations_id_seq',
      'knex_migrations_lock',
      'knex_migrations_lock_index_seq',
    ],
  };

  return knexCleaner.clean(db, options);
};

const describeRepository = async (description, f) => {
  const db = constructTestDb();

  describe(description, () => { // eslint-disable-line jest/valid-title
    beforeEach(async () => {
      await cleanUpDb(db);
    });

    afterEach(async () => {
      await cleanUpDb(db);
    });

    afterAll(async () => {
      await db.destroy();
    });

    f(db);
  });
};

export default describeRepository;
