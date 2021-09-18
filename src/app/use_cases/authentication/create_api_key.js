const constructCreateApiKey = ({ repositories, authentication }) => async () => {
  const { generateApiKey } = authentication.services;
  const generateResult = await generateApiKey();

  return generateResult.bind(async ({ plainTextApiKey, unpersistedApiKey }) => {
    const repository = repositories.apiKeys;
    const repositoryResult = await repository.create(unpersistedApiKey);

    return repositoryResult.map((_apiKey) => plainTextApiKey);
  });
};

export default constructCreateApiKey;
