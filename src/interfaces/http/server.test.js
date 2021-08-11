import request from 'supertest';

import { verifyPublicKeyFor } from 'test/helpers/http';
import constructServer from './server';

describe('server', () => {
  const config = {
    port: null,
    nodeEnv: 'test',
  };
  const verifyPublicKey = verifyPublicKeyFor('publicKey');
  const useCases = { authentication: { verifyPublicKey } };
  const { app } = constructServer({ config, useCases });

  describe('/', () => {
    it('mounts browser router', async () =>
      request(app)
        .head('/')
        .expect(200));
  });

  describe('/api/', () => {
    it('mounts api router', async () =>
      request(app)
        .head('/api/v1/')
        .set('Authorization', 'Api-Key publicKey')
        .expect(200));
  });
});
