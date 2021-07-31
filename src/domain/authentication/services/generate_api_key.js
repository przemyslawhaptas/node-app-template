import { v4 as uuidv4 } from 'uuid';

import { buildPlainTextApiKey } from '../entities';

const constructGenerateApiKey = ({ hashApiKey }) => async () => {
  const publicKey = uuidv4();
  const privateKey = uuidv4();
  const plainTextApiKey = buildPlainTextApiKey(publicKey, privateKey);
  const result = await hashApiKey(plainTextApiKey);

  return result.map((unpersistedApiKey) => (
    {
      plainTextApiKey,
      unpersistedApiKey,
    }
  ));
};

export default constructGenerateApiKey;
