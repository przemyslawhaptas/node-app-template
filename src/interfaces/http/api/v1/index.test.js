import request from 'supertest';

import describeRouter from 'test/helpers/http';
import constructV1Router from './index';

describeRouter('API v1', (app) => {
  app.use('/api/v1/', constructV1Router());

  describe('GET /', () => {
    it('routes to index action', async () => {
      const response = await request(app)
        .get('/api/v1/')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toStrictEqual({ message: 'from api v1 index' });
    });
  });
});
