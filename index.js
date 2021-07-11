import express from 'express';
import bodyParser from 'body-parser';

import helloWorld from 'src/hello_world';
import config from './config';

const app = express();
const { port } = config;

app.use(bodyParser.json());

app.get('/', (req, res, _next) => {
  res.json({ message: 'from index api' });
});

app.listen(port, () => {
  console.log(helloWorld(port));
});
