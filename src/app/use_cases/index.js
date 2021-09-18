import constructAuthentication from './authentication';

const constructUseCases = ({ repositories, domain }) => ({
  authentication: constructAuthentication({ repositories, domain }),
});

export default constructUseCases;
