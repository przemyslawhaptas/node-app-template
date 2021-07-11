import express from 'express';
import bodyParser from 'body-parser';

import helloWorld from './hello_world';

const constructServer = ({ config }) => {
  const { port } = config;
  const app = express();

  app.use(bodyParser.json());

  app.get('/', (req, res, _next) => {
    res.json({ message: 'from index api' });
  });

  const start = () => {
    app.listen(port, () => {
      console.log(helloWorld(port));
    });
  };

  return {
    start,
  };
};

export default constructServer;
