import constructGenerateApiKey from './generate_api_key';
import constructHashApiKey from './hash_api_key';

const constructServices = ({ encryption }) => {
  const hashApiKey = constructHashApiKey({ encryption });
  const generateApiKey = constructGenerateApiKey({ hashApiKey });

  return {
    generateApiKey,
  };
};

export default constructServices;
