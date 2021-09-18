import request from 'supertest';
import { Left } from 'monet';

import describeRouter, { verifyPublicKeyFor } from 'test/helpers/http';
import constructApiRouter from './index';

describeRouter('API', (app) => {
  const config = { nodeEnv: 'test' };
  const publicKey = 'publicKey';
  const verifyPublicKey = verifyPublicKeyFor(publicKey);
  const useCases = { authentication: { verifyPublicKey } };

  app.use('/api/', constructApiRouter({ config, useCases }));

  it('mounts v1 router', async () =>
    request(app)
      .head('/api/v1/')
      .set('Authorization', `Api-Key ${publicKey}`)
      .expect(200));

  describe('useApiErrorHandler', () => {
    it('returns 500 Internal Server Error if an error is thrown', async () => {
      const badUseCases = {
        authentication: {
          verifyPublicKey: (_publicKey) => Promise.resolve(Left(new Error('ERROR'))),
        },
      };
      app.use('/api/', constructApiRouter({ config, useCases: badUseCases }));

      return request(app)
        .head('/api/v1/')
        .set('Authorization', `Api-Key ${publicKey}`)
        .expect(500);
    });

    it('returns 404 Not Found if a path cannot be found', async () =>
      request(app)
        .head('/api/v100/')
        .set('Authorization', `Api-Key ${publicKey}bogus`)
        .expect(404));
  });
});
