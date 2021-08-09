import request from 'supertest';

import describeRouter from 'test/helpers/http';
import constructApiRouter from './index';

describeRouter('API', (app) => {
  app.use('/api/', constructApiRouter());

  describe('/api/v1/', () => {
    it('mounts v1 router', async () =>
      request(app)
        .head('/api/v1/')
        .expect(200));
  });
});
