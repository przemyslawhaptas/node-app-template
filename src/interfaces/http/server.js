import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import helloWorld from './hello_world';

const constructServer = ({ config, logger }) => {
  const { port, nodeEnv } = config;
  const app = express();

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(logger.file);
  if (nodeEnv === 'development') app.use(logger.console);

  app.get('/', (req, res, _next) => {
    res.json({ message: 'from index api' });
  });

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
