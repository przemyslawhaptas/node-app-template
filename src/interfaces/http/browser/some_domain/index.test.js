import request from 'supertest';

import describeRouter from 'test/helpers/http';
import constructSomeDomainRouter from './index';

describeRouter('browser someDomain', (app) => {
  app.use('/some-domain/', constructSomeDomainRouter());

  describe('GET /', () => {
    it('routes to index action', async () => {
      const response = await request(app)
        .get('/some-domain/')
        .expect(200)
        .expect('Content-Type', /text\/html/);

      expect(response.text).toContain('Hello Przemek');
    });
  });
});
