const constructVerifyPublicKey = ({ repositories }) => (publicKey) => {
  const repository = repositories.apiKeys;

  return repository.findByPublicKey(publicKey);
};

export default constructVerifyPublicKey;
