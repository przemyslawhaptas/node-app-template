import { Right, Left } from 'monet';

import constructCreateApiKey from './create_api_key';

describe('createApiKey', () => {
  describe('when both api key generation and persistance succeeds', () => {
    const plainTextApiKey = {};
    const unpersistedApiKey = {};
    const authentication = {
      services: {
        generateApiKey: () => Promise.resolve(Right({ plainTextApiKey, unpersistedApiKey })),
      },
    };
    const apiKey = {};
    const repositories = {
      apiKeys: {
        create: (_unpersistedApiKey) => Promise.resolve(Right(apiKey)),
      },
    };
    const createApiKey = constructCreateApiKey({ repositories, authentication });

    it('returns the api key in plain text', async () => {
      const result = await createApiKey();

      expect(result.right()).toStrictEqual(plainTextApiKey);
    });
  });

  describe('when api key generation fails', () => {
    const error = 'ERROR';
    const authentication = {
      services: {
        generateApiKey: () => Promise.resolve(Left(error)),
      },
    };
    const repositories = {};
    const createApiKey = constructCreateApiKey({ repositories, authentication });

    it('returns an error', async () => {
      const result = await createApiKey();

      expect(result.left()).toEqual(error);
    });
  });

  describe('when persisting the api key fails', () => {
    const plainTextApiKey = {};
    const unpersistedApiKey = {};
    const authentication = {
      services: {
        generateApiKey: () => Promise.resolve(Right({ plainTextApiKey, unpersistedApiKey })),
      },
    };
    const error = 'ERROR';
    const repositories = {
      apiKeys: {
        create: (_unpersistedApiKey) => Promise.resolve(Left(error)),
      },
    };
    const createApiKey = constructCreateApiKey({ repositories, authentication });

    it('returns an error', async () => {
      const result = await createApiKey();

      expect(result.left()).toEqual(error);
    });
  });
});
