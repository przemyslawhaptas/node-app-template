import constructCreateApiKey from './create_api_key';

const constructAuthentication = ({ repositories, domain }) => {
  const { authentication } = domain;

  return {
    createApiKey: constructCreateApiKey({ repositories, authentication }),
  };
};

export default constructAuthentication;
