import apiKeyMapper from 'db/mappers/api_key';

const create = ({ db, entities }) => async (entity) => {
  const mapper = apiKeyMapper(entities.authentication.apiKey);
  const { public_key, private_key } = mapper.fromEntity(entity);

  const row = await db.schema.raw(
    `
      INSERT INTO api_keys (public_key private_key)
      VALUES (?, ?);
    `,
    [public_key, private_key],
  );

  return row.map(mapper.toEntity);
};

const retrieve = ({ db, entities }) => async (id) => {
  const mapper = apiKeyMapper(entities.authentication.apiKey);
  const row = await db.schema.raw(
    `
      SELECT * FROM api_keys
      WHERE api_keys.id = ?;
    `,
    [id],
  );

  return row.map(mapper.toEntity);
};

const destroy = ({ db, entities }) => async (id) => {
  const mapper = apiKeyMapper(entities.authentication.apiKey);
  const row = await db.schema.raw(
    `
      DELETE FROM api_keys
      WHERE api_keys.id = ?;
    `,
    [id],
  );

  return row.map(mapper.toEntity);
};

const apiKeysRepository = ({ db, entities }) => ({
  create: create({ db, entities }),
  retrieve: retrieve({ db, entities }),
  destroy: destroy({ db, entities }),
});

export default apiKeysRepository;
