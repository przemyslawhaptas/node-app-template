import { Right, Left } from 'monet';

import constructGenerateApiKey from './generate_api_key';
import { buildPlainTextApiKey, buildUnpersistedApiKey } from '../entities';

jest.mock('uuid', () => ({
  v4: () => 'uuid',
}));

describe('generateApiKey', () => {
  describe('when hashing a generated plainTextApiKey succeeds', () => {
    const hashApiKey = (plainTextApiKey) => {
      const unpersistedApiKey = buildUnpersistedApiKey(
        plainTextApiKey.publicKey,
        `${plainTextApiKey.plainTextPrivateKey} hashed`,
      );

      return Promise.resolve(Right(unpersistedApiKey));
    };
    const generateApiKey = constructGenerateApiKey({ hashApiKey });

    it('returns plainTextApiKey and unpersistedApiKey entities', async () => {
      const result = await generateApiKey();
      const expected = {
        plainTextApiKey: buildPlainTextApiKey('uuid', 'uuid'),
        unpersistedApiKey: buildUnpersistedApiKey('uuid', 'uuid hashed'),
      };

      expect(result.right()).toStrictEqual(expected);
    });
  });

  describe('when hashing a generated plainTextApiKey fails', () => {
    const error = 'Unexpected error occurred';
    const hashApiKey = (_plainTextApiKey) => Promise.resolve(Left(error));
    const generateApiKey = constructGenerateApiKey({ hashApiKey });

    it('returns an error', async () => {
      const result = await generateApiKey();
      const expected = error;

      expect(result.left()).toStrictEqual(expected);
    });
  });
});
