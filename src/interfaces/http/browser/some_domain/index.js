import { Router } from 'express';

import routes from './routes';
import constructController from './controller';

const constructSomeDomainRouter = () => {
  const router = Router();
  const controller = constructController();

  routes(router, controller);

  return router;
};

export default constructSomeDomainRouter;
