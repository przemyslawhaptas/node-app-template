import { buildPlainTextApiKey, buildUnpersistedApiKey } from '../entities';
import constructHashApiKey from './hash_api_key';

describe('hashApiKey', () => {
  describe('when encrypting a plainTextPrivateKey succeeds', () => {
    const encryption = {
      hash: (plainTextPrivateKey) => Promise.resolve(`${plainTextPrivateKey}#`),
    };
    const hashApiKey = constructHashApiKey({ encryption });

    it('builds an unpersistedApiKey entity', async () => {
      const publicKey = 'publicKey';
      const plainTextPrivateKey = 'plainTextPrivateKey';
      const plainTextApiKey = buildPlainTextApiKey(publicKey, plainTextPrivateKey);

      const result = await hashApiKey(plainTextApiKey);
      const expected = buildUnpersistedApiKey(publicKey, 'plainTextPrivateKey#');

      expect(result.right()).toStrictEqual(expected);
    });
  });

  describe('when encrypting a plainTextPrivateKey fails', () => {
    const error = 'Unexpected error';
    const encryption = {
      hash: (_plainTextPrivateKey) => Promise.reject(error),
    };
    const hashApiKey = constructHashApiKey({ encryption });

    it('returns an error', async () => {
      const publicKey = 'publicKey';
      const plainTextPrivateKey = 'plainTextPrivateKey';
      const plainTextApiKey = buildPlainTextApiKey(publicKey, plainTextPrivateKey);

      const result = await hashApiKey(plainTextApiKey);
      const expected = error;

      expect(result.left()).toStrictEqual(expected);
    });
  });
});
