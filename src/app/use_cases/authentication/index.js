import constructCreateApiKey from './create_api_key';
import constructVerifyPublicKey from './verify_public_key';

const constructAuthentication = ({ repositories, domain }) => {
  const { authentication } = domain;

  return {
    createApiKey: constructCreateApiKey({ repositories, authentication }),
    verifyPublicKey: constructVerifyPublicKey({ repositories }),
  };
};

export default constructAuthentication;
