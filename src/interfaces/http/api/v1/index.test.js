import request from 'supertest';

import describeRouter, { verifyPublicKeyFor } from 'test/helpers/http';
import constructV1Router from './index';

describeRouter('API v1', (app) => {
  const publicKey = 'publicKey';
  const verifyPublicKey = verifyPublicKeyFor(publicKey);
  const useCases = { authentication: { verifyPublicKey } };
  app.use('/api/v1/', constructV1Router({ useCases }));

  describe('GET /', () => {
    it('routes to index action', async () => {
      const response = await request(app)
        .get('/api/v1/')
        .set('Authorization', `Api-Key ${publicKey}`)
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toStrictEqual({ message: 'from api v1 index' });
    });
  });

  describe('useAuthentication', () => {
    it('returns 401 Unauthorized if publicKey is not passed', async () =>
      request(app)
        .head('/api/v1/')
        .expect(401));

    it('returns 401 Unauthorized if an incorrect publicKey is passed', async () =>
      request(app)
        .head('/api/v1/')
        .set('Authorization', `Api-Key ${publicKey}bogus`)
        .expect(401));
  });
});
