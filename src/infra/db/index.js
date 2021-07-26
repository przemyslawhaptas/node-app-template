import knex from 'knex';

const constructDb = ({ config }) => knex(config.knex);

export default constructDb;
