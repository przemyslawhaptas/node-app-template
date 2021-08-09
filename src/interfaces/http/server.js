import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import helloWorld from './hello_world';
import constructBrowserRouter from './browser';
import setBrowserViews from './browser/views';
import constructApiRouter from './api';

const constructServer = ({ config, logger }) => {
  const { port, nodeEnv } = config;
  const app = express();

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(logger.file);
  if (['development', 'test'].includes(nodeEnv)) app.use(logger.console);

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
