import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import setBrowserViews from 'http/browser/views';

const describeRouter = async (description, f) => {
  const app = express();
  app.use(helmet());
  app.use(bodyParser.json());

  setBrowserViews(app);

  describe(description, () => { // eslint-disable-line jest/valid-title
    f(app);
  });
};

export default describeRouter;
