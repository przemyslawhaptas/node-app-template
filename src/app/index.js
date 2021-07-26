import constructServer from 'src/interfaces/http/server';
import constructLogger from 'src/infra/logging';
import constructDb from 'src/infra/db';

const constructApp = (config) => {
  const logger = constructLogger({ config });
  const db = constructDb({ config });
  const server = constructServer({ config, logger, db });
  const start = () => {
    server.start();
  };

  return {
    start,
  };
};

export default constructApp;
