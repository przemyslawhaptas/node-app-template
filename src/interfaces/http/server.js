import express from 'express';

import useShared from './middlewares/shared';
import constructUseLogging from './middlewares/logging';
import setBrowserViews from './browser/views';
import constructBrowserRouter from './browser';
import constructApiRouter from './api';
import helloWorld from './hello_world';

const constructServer = ({ config, useCases }) => {
  const { port } = config;

  const app = express();

  useShared(app);
  const useLogging = constructUseLogging({ config });
  useLogging(app);

  setBrowserViews(app);
  const browserRouter = constructBrowserRouter();
  app.use('/', browserRouter);

  const apiRouter = constructApiRouter({ config, useCases });
  app.use('/api', apiRouter);

  const start = () => {
    app.listen(port, () => {
      console.log(helloWorld(port)); // eslint-disable-line no-console
    });
  };

  return {
    start,
    app,
  };
};

export default constructServer;
