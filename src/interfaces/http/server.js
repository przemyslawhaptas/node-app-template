import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import helloWorld from './hello_world';
import constructBrowserRouter from './browser';

const constructServer = ({ config, logger }) => {
  const { port, nodeEnv } = config;
  const app = express();

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(logger.file);
  if (nodeEnv === 'development') app.use(logger.console);

  const browserRouter = constructBrowserRouter();
  app.use('/', browserRouter);

  const start = () => {
    app.listen(port, () => {
      console.log(helloWorld(port)); // eslint-disable-line no-console
    });
  };

  return {
    start,
  };
};

export default constructServer;
