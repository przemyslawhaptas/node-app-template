export const up = (knex) => knex.schema.raw(
  `
    CREATE TABLE api_keys (
      id          BIGSERIAL PRIMARY KEY,
      public_key  VARCHAR(100) NOT NULL UNIQUE,
      private_key VARCHAR(100) NOT NULL UNIQUE,
      created_at  TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );

    CREATE INDEX api_keys_public_key_index ON api_keys (public_key);
  `,
);

export const down = (knex) => knex.schema.raw(
  `
    DROP INDEX api_keys_public_key_index;
    DROP TABLE api_keys;
  `,
);
