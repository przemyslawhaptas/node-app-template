import { Router } from 'express';

import setRoutes from './routes';
import constructController from './controller';
import constructSomeDomainRouter from './some_domain';

const constructBrowserRouter = () => {
  const router = Router();
  const controller = constructController();
  const someDomainRouter = constructSomeDomainRouter();

  setRoutes(router, controller);
  router.use('/some-domain', someDomainRouter);

  return router;
};

export default constructBrowserRouter;
