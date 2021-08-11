import describeRepository from 'test/helpers/db';

import { entities } from 'src/domain';
import constructApiKeysRepository from './api_keys';

describeRepository('apiKeysRepository', (db) => {
  const apiKeysRepository = constructApiKeysRepository({ db, entities });
  const { buildUnpersistedApiKey } = entities.authentication;

  describe('create', () => {
    it('persists an unpersistedApiKey entity and returns an apiKey entity', async () => {
      const publicKey = 'publicKey';
      const privateKey = 'privateKey';
      const unpersistedApiKey = buildUnpersistedApiKey(publicKey, privateKey);

      const result = await apiKeysRepository.create(unpersistedApiKey);
      const apiKey = result.right();

      expect(apiKey.publicKey).toEqual(publicKey);
      expect(apiKey.privateKey).toEqual(privateKey);
      expect(apiKey).toHaveProperty('id');
      expect(apiKey).toHaveProperty('createdAt');
    });

    describe('with duplicate public_key', () => {
      it('returns an error', async () => {
        const unpersistedApiKey = buildUnpersistedApiKey('public key', 'private key');
        const apiKey = (await apiKeysRepository.create(unpersistedApiKey)).right();
        const unpersistedApiKey2 = buildUnpersistedApiKey(apiKey.publicKey, 'private key 2');

        const result = await apiKeysRepository.create(unpersistedApiKey2);

        expect(result.left().detail).toEqual('Key (public_key)=(public key) already exists.');
      });
    });

    describe('with duplicate private_key', () => {
      it('returns an error', async () => {
        const unpersistedApiKey = buildUnpersistedApiKey('public key', 'private key');
        const apiKey = (await apiKeysRepository.create(unpersistedApiKey)).right();
        const unpersistedApiKey2 = buildUnpersistedApiKey('public key 2', apiKey.privateKey);

        const result = await apiKeysRepository.create(unpersistedApiKey2);

        expect(result.left().detail).toEqual('Key (private_key)=(private key) already exists.');
      });
    });
  });

  describe('retrieve', () => {
    it('returns an existing apiKey entity', async () => {
      const unpersistedApiKey = buildUnpersistedApiKey('publicKey', 'privateKey');
      const apiKey = (await apiKeysRepository.create(unpersistedApiKey)).right();

      const result = await apiKeysRepository.retrieve(apiKey.id);

      expect(result.right()).toStrictEqual(apiKey);
    });

    describe('when an apiKey by the given id does not exist', () => {
      it('returns an error', async () => {
        const result = await apiKeysRepository.retrieve(1);

        expect(result.left()).toEqual('Query did not return any rows.');
      });
    });
  });

  describe('destroy', () => {
    it('returns the destroyed apiKey entity', async () => {
      const unpersistedApiKey = buildUnpersistedApiKey('publicKey', 'privateKey');
      const apiKey = (await apiKeysRepository.create(unpersistedApiKey)).right();

      const destroyResult = await apiKeysRepository.destroy(apiKey.id);
      const retrieveResult = await apiKeysRepository.retrieve(apiKey.id);

      expect(destroyResult.right()).toStrictEqual(apiKey);
      expect(retrieveResult.left()).toEqual('Query did not return any rows.');
    });

    describe('when an apiKey by the given id does not exist', () => {
      it('returns an error', async () => {
        const result = await apiKeysRepository.destroy(1);

        expect(result.left()).toEqual('Query did not return any rows.');
      });
    });
  });

  describe('findByPublicKey', () => {
    it('returns Just an existing apiKey entity', async () => {
      const unpersistedApiKey = buildUnpersistedApiKey('publicKey', 'privateKey');
      const apiKey = (await apiKeysRepository.create(unpersistedApiKey)).right();

      const result = await apiKeysRepository.findByPublicKey('publicKey');

      expect(result.right().just()).toStrictEqual(apiKey);
    });

    describe('when an apiKey by the given id does not exist', () => {
      it('returns None', async () => {
        const result = await apiKeysRepository.findByPublicKey('nonexistent');

        expect(result.right().isNone()).toEqual(true);
      });
    });
  });
});
