import express from 'express';

import setMiddlewares from './middlewares';
import setBrowserViews from './browser/views';
import constructBrowserRouter from './browser';
import constructApiRouter from './api';
import helloWorld from './hello_world';

const constructServer = ({ config }) => {
  const { port } = config;

  const app = express();
  setMiddlewares(app, config);

  setBrowserViews(app);
  const browserRouter = constructBrowserRouter();
  app.use('/', browserRouter);

  const apiRouter = constructApiRouter();
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
