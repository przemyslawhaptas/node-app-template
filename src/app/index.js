import { entities } from 'src/domain';
import constructServer from 'src/interfaces/http/server';
import constructLogger from 'src/infra/logging';
import constructDb from 'src/infra/db';
import constructRepositories from 'src/infra/db/repositories';
import constructUseCases from 'src/app/use_cases';

const constructApp = (config) => {
  const logger = constructLogger({ config });
  const db = constructDb({ config });
  const repositories = constructRepositories({ db, entities });
  const useCases = constructUseCases({ repositories });
  const server = constructServer({ config, logger, useCases });
  const start = () => {
    server.start();
  };

  return {
    start,
  };
};

export default constructApp;
