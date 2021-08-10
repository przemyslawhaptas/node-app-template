import bodyParser from 'body-parser';
import helmet from 'helmet';

import constructLogger from './logging';

const setMiddlewares = (app, config) => {
  const { nodeEnv } = config;
  const logger = constructLogger({ config });

  app.use(helmet());
  app.use(bodyParser.json());
  app.use(logger.file);
  if (['development', 'test'].includes(nodeEnv)) app.use(logger.console);
};

export default setMiddlewares;
