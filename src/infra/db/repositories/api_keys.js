import { Either } from 'monet';

import constructApiKeyMapper from 'db/mappers/api_key';

const create = ({ db, apiKeyMapper }) => async (entity) => {
  const { fromUnpersistedEntity, toEntity } = apiKeyMapper;
  const { public_key, private_key } = fromUnpersistedEntity(entity);
  const result = await Either.fromPromise(db.schema.raw(
    `
      INSERT INTO api_keys (public_key, private_key)
      VALUES (?, ?)
      RETURNING *;
    `,
    [public_key, private_key],
  ));

  return result.map(({ rows }) => toEntity(rows[0]));
};

const retrieve = ({ db, apiKeyMapper }) => async (id) => {
  const { toEntity } = apiKeyMapper;
  const result = await Either.fromPromise(db.schema.raw(
    `
      SELECT * FROM api_keys
      WHERE api_keys.id = ?;
    `,
    [id],
  ));

  return result.map(({ rows }) => toEntity(rows[0]));
};

const destroy = ({ db, apiKeyMapper }) => async (id) => {
  const { toEntity } = apiKeyMapper;
  const result = await Either.fromPromise(db.schema.raw(
    `
      DELETE FROM api_keys
      WHERE api_keys.id = ?
      RETURNING *;
    `,
    [id],
  ));

  return result.map(({ rows }) => toEntity(rows[0]));
};

const apiKeysRepository = ({ db, entities }) => {
  const { buildApiKey } = entities.authentication;
  const apiKeyMapper = constructApiKeyMapper(buildApiKey);

  return ({
    create: create({ db, apiKeyMapper }),
    retrieve: retrieve({ db, apiKeyMapper }),
    destroy: destroy({ db, apiKeyMapper }),
  });
};

export default apiKeysRepository;
