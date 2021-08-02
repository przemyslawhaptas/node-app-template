import { entities } from 'src/domain';
import constructApiKeyMapper from './api_key';

describe('apiKeyMapper', () => {
  const { buildApiKey, buildUnpersistedApiKey } = entities.authentication;
  const apiKeyMapper = constructApiKeyMapper(buildApiKey);

  describe('fromUnpersistedEntity', () => {
    const unpersistedApiKey = buildUnpersistedApiKey('publicKey', 'privateKey');

    it('maps unpersistedApiKey entity to query params', () => {
      const result = apiKeyMapper.fromUnpersistedEntity(unpersistedApiKey);
      const expected = {
        public_key: unpersistedApiKey.publicKey,
        private_key: unpersistedApiKey.privateKey,
      };

      expect(result).toStrictEqual(expected);
    });
  });

  describe('fromEntity', () => {
    const apiKey = buildApiKey({
      id: 1,
      publicKey: 'publicKey',
      privateKey: 'privateKey',
      createdAt: '2021-07-31 17:07:19',
    });

    it('maps apiKey entity to query params', () => {
      const result = apiKeyMapper.fromEntity(apiKey);
      const expected = {
        id: apiKey.id,
        public_key: apiKey.publicKey,
        private_key: apiKey.privateKey,
        created_at: apiKey.createdAt,
      };

      expect(result).toStrictEqual(expected);
    });
  });

  describe('toEntity', () => {
    const row = {
      id: 1,
      public_key: 'publicKey',
      private_key: 'privateKey',
      created_at: '2021-07-31 17:07:19',
    };

    it('maps query row into apiKey entity', () => {
      const result = apiKeyMapper.toEntity(row);
      const expected = {
        id: row.id,
        publicKey: row.public_key,
        privateKey: row.private_key,
        createdAt: row.created_at,
      };

      expect(result).toStrictEqual(expected);
    });
  });
});
