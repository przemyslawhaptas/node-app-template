// Domain
import constructDomain, { entities } from 'src/domain';

// Interfaces
import constructServer from 'src/interfaces/http/server';

// Infrastructure
import constructLogger from 'src/infra/logging';
import constructDb from 'src/infra/db';
import constructRepositories from 'src/infra/db/repositories';
import * as encryption from 'src/infra/encryption';

// App
import constructUseCases from 'src/app/use_cases';

const constructApp = (config) => {
  const logger = constructLogger({ config });
  const db = constructDb({ config });
  const repositories = constructRepositories({ db, entities });

  const domain = constructDomain({ encryption });
  const useCases = constructUseCases({ repositories, domain });

  const server = constructServer({ config, logger, useCases });

  return {
    start: server.start,
    useCases,
  };
};

export default constructApp;
