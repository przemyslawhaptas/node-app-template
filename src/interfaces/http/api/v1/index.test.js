import request from 'supertest';

import describeRouter from 'test/helpers/http';
import constructV1Router from './index';

describeRouter('API v1', (app) => {
  app.use('/', constructV1Router());

  describe('GET /', () => {
    it('leads to index action', async () =>
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ message: 'from api v1 index' }));
  });
});
