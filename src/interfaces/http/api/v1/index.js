import { Router } from 'express';

import constructUseAuthentication from 'http/middlewares/authentication';
import setRoutes from './routes';
import constructController from './controller';

const constructV1Router = ({ useCases }) => {
  const router = Router();
  const controller = constructController();
  const { authentication } = useCases;
  const useAuthentication = constructUseAuthentication({ authentication });

  useAuthentication(router);
  setRoutes(router, controller);

  return router;
};

export default constructV1Router;
