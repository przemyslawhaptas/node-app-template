import request from 'supertest';

import describeRouter from 'test/helpers/http';
import constructBrowserRouter from './index';

describeRouter('browser', (app) => {
  app.use('/', constructBrowserRouter());

  describe('GET /', () => {
    it('routes to index action', async () => {
      const response = await request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(response.body).toStrictEqual({ message: 'from browser index' });
    });
  });

  describe('/some-domain/', () => {
    it('mounts some domain router', async () =>
      request(app)
        .head('/some-domain/')
        .expect(200));
  });
});
