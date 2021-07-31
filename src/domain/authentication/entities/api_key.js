const buildApiKey = (params) => (
  {
    id: params.id,
    publicKey: params.publicKey,
    privateKey: params.privateKey,
    createdAt: params.createdAt,
  }
);

export const buildUnpersistedApiKey = (publicKey, privateKey) => (
  {
    publicKey,
    privateKey,
  }
);

export const buildPlainTextApiKey = (publicKey, plainTextPrivateKey) => (
  {
    publicKey,
    plainTextPrivateKey,
  }
);

export default buildApiKey;
