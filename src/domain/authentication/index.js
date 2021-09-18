import * as entities from './entities';
import constructServices from './services';

const constructAuthentication = (dependencies) => ({
  entities,
  services: constructServices(dependencies),
});

export { entities };

export default constructAuthentication;
