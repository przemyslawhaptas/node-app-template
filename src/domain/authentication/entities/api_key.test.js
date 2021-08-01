import buildApiKey, { buildUnpersistedApiKey, buildPlainTextApiKey } from './api_key';

describe('buildApiKey', () => {
  it('builds an apiKey entity', () => {
    const params = {
      id: 1,
      publicKey: 'publicKey',
      privateKey: 'privateKey',
      createdAt: '2021-07-31 17:07:19',
      additional: 'anything',
    };

    const expected = {
      id: params.id,
      publicKey: params.publicKey,
      privateKey: params.privateKey,
      createdAt: params.createdAt,
    };

    const result = buildApiKey(params);

    expect(result).toStrictEqual(expected);
  });
});

describe('buildUnpersistedApiKey', () => {
  it('builds an unpersistedApiKey entity', () => {
    const publicKey = 'publicKey';
    const privateKey = 'privateKey';

    const expected = {
      publicKey,
      privateKey,
    };

    const result = buildUnpersistedApiKey(publicKey, privateKey);

    expect(result).toStrictEqual(expected);
  });
});

describe('buildPlainTextApiKey', () => {
  it('builds a plainTextApiKey entity', () => {
    const publicKey = 'publicKey';
    const plainTextPrivateKey = 'plainTextPrivateKey';

    const expected = {
      publicKey,
      plainTextPrivateKey,
    };

    const result = buildPlainTextApiKey(publicKey, plainTextPrivateKey);

    expect(result).toStrictEqual(expected);
  });
});
