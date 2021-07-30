const buildApiKey = (params) => (
  {
    id: params.id,
    publicKey: params.publicKey,
    privateKey: params.privateKey,
    createdAt: params.createdAt,
  }
);

export default buildApiKey;
