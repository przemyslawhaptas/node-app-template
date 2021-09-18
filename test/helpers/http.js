import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { Right, Just, None } from 'monet';

import setBrowserViews from 'http/browser/views';

export const verifyPublicKeyFor = (correctKey) => (publicKey) => {
  if (publicKey !== correctKey) return Promise.resolve(Right(None()));

  return Promise.resolve(Right(Just({ publicKey })));
};

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
