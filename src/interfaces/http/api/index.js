import { Router } from 'express';

import constructV1Router from './v1';

const constructApiRouter = () => {
  const router = Router();
  const v1Router = constructV1Router();

  router.use('/v1', v1Router);

  return router;
};

export default constructApiRouter;
