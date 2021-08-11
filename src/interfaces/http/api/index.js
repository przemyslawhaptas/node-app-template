import { Router } from 'express';

import constructUseApiErrorHandler from 'http/middlewares/errors/api';
import constructV1Router from './v1';

const constructApiRouter = ({ config, useCases }) => {
  const router = Router();
  const v1Router = constructV1Router({ useCases });
  const useApiErrorHandler = constructUseApiErrorHandler({ config });

  router.use('/v1', v1Router);

  useApiErrorHandler(router);

  return router;
};

export default constructApiRouter;
