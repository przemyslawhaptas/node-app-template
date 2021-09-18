const fromUnpersistedEntity = (unpersistedApiKey) => (
  {
    public_key: unpersistedApiKey.publicKey,
    private_key: unpersistedApiKey.privateKey,
  }
);

const fromEntity = (apiKey) => (
  {
    id: apiKey.id,
    public_key: apiKey.publicKey,
    private_key: apiKey.privateKey,
    created_at: apiKey.createdAt,
  }
);

const toEntity = (buildEntity) => (row) => buildEntity(
  {
    id: row.id,
    publicKey: row.public_key,
    privateKey: row.private_key,
    createdAt: row.created_at,
  },
);

const apiKeyMapper = (buildEntity) => ({
  fromUnpersistedEntity,
  fromEntity,
  toEntity: toEntity(buildEntity),
});

export default apiKeyMapper;
