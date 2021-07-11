import constructServer from 'src/interfaces/http/server';
import constructLogger from 'src/infra/logging';

const constructApp = (config) => {
  const logger = constructLogger({ config });
  const server = constructServer({ config, logger });
  const start = () => {
    server.start();
  };

  return {
    start,
  };
};

export default constructApp;
