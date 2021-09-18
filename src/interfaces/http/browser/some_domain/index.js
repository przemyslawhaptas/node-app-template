import { Router } from 'express';

import setRoutes from './routes';
import constructController from './controller';

const constructSomeDomainRouter = () => {
  const router = Router();
  const controller = constructController();

  setRoutes(router, controller);

  return router;
};

export default constructSomeDomainRouter;
