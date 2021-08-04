import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const describeRouter = async (description, f) => {
  const app = express();
  app.use(helmet());
  app.use(bodyParser.json());

  describe(description, () => { // eslint-disable-line jest/valid-title
    f(app);
  });
};

export default describeRouter;
