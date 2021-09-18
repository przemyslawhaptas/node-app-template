import constructApiKeysRepository from './api_keys';

const constructRepositories = ({ db, entities }) => ({
  apiKeys: constructApiKeysRepository({ db, entities }),
});

export default constructRepositories;
