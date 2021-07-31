import constructAuthentication, { entities as authenticationEntities } from './authentication';

const entities = {
  authentication: authenticationEntities,
};

const constructDomain = (dependencies) => (
  {
    authentication: constructAuthentication(dependencies),
  }
);

export { entities };

export default constructDomain;
