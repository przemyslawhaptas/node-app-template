import request from 'supertest';

import constructServer from './server';

describe('server', () => {
  const config = {
    port: null,
    nodeEnv: 'test',
  };
  const logger = {
    console: (_request, _response, next) => { next(); },
    file: (_request, _response, next) => { next(); },
  };
  const { app } = constructServer({ config, logger });

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
        .expect(200));
  });
});
