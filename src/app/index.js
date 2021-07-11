import constructServer from 'src/interfaces/http/server';

const constructApp = (config) => {
  const server = constructServer({ config });
  const start = () => {
    server.start();
  };

  return {
    start,
  };
};

export default constructApp;
