import { Either } from 'monet';

import { buildUnpersistedApiKey } from '../entities';

const constructHashApiKey = ({ encryption }) => async (plainTextApiKey) => {
  const { publicKey, plainTextPrivateKey } = plainTextApiKey;
  const result = await Either.fromPromise(encryption.hash(plainTextPrivateKey));

  return result.map((privateKey) => buildUnpersistedApiKey(publicKey, privateKey));
};

export default constructHashApiKey;
