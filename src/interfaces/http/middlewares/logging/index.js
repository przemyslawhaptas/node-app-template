import fs from 'fs';
import morgan from 'morgan';

const constructUseLogging = ({ config }) => (app) => {
  const { nodeEnv } = config;
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const stream = fs.createWriteStream(`log/${nodeEnv}.log`, { flags: 'a' });
  const fileLogger = morgan('combined', { stream });
  app.use(fileLogger);

  if (nodeEnv === 'development') {
    const consoleLogger = morgan('dev');
    app.use(consoleLogger);
  }
};

export default constructUseLogging;
