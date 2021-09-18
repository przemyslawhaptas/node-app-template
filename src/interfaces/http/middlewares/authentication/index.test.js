import passport from 'passport';
import HeaderAPIKeyStrategy from 'passport-headerapikey';

import constructUseAuthentication from './index';

jest.mock('passport');
jest.mock('passport-headerapikey');

describe('useAuthentication', () => {
  const authentication = { verifyPublicKey: () => {} };
  const useAuthentication = constructUseAuthentication({ authentication });

  it('uses a passport authentication middleware with HeaderAPIKeyStrategy', () => {
    const app = { use: jest.fn() };
    const authenticationMiddleware = () => {};
    passport.authenticate
      .mockImplementation((_strategyName, _options) => authenticationMiddleware);

    useAuthentication(app);

    expect(passport.use.mock.calls).toEqual([
      [HeaderAPIKeyStrategy.mock.instances[0]],
    ]);
    expect(passport.authenticate.mock.calls).toEqual([
      ['headerapikey', { session: false }],
    ]);
    expect(app.use.mock.calls).toEqual([
      [authenticationMiddleware],
    ]);
  });
});
