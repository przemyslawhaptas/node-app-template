import {
  Right, Left, Just, None,
} from 'monet';

import constructVerifyPublicKey from './verify_public_key';

describe('verifyPublicKey', () => {
  describe('when the publicKey has been generated before', () => {
    const publicKey = 'publicKey';
    const apiKey = {};
    const repositories = {
      apiKeys: {
        findByPublicKey: (_publicKey) => Promise.resolve(Right(Just(apiKey))),
      },
    };
    const verifyPublicKey = constructVerifyPublicKey({ repositories });

    it('returns the corresponding ApiKey entity', async () => {
      const result = await verifyPublicKey(publicKey);

      expect(result.right().just()).toEqual(apiKey);
    });
  });

  describe('when the publicKey does not exist', () => {
    const publicKey = 'nonexistent';
    const repositories = {
      apiKeys: {
        findByPublicKey: (_publicKey) => Promise.resolve(Right(None())),
      },
    };
    const verifyPublicKey = constructVerifyPublicKey({ repositories });

    it('returns an error', async () => {
      const result = await verifyPublicKey(publicKey);

      expect(result.right().isNone()).toEqual(true);
    });
  });

  describe('when an error was thrown when finding the publicKey', () => {
    const publicKey = 'apikey';
    const error = 'ERROR';
    const repositories = {
      apiKeys: {
        findByPublicKey: (_publicKey) => Promise.resolve(Left(error)),
      },
    };
    const verifyPublicKey = constructVerifyPublicKey({ repositories });

    it('returns an error', async () => {
      const result = await verifyPublicKey(publicKey);

      expect(result.left()).toEqual(error);
    });
  });
});
