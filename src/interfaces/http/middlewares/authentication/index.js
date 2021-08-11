import passport from 'passport';
import HeaderAPIKeyStrategy from 'passport-headerapikey';

const constructUseAuthentication = ({ authentication }) => (app) => {
  const { verifyPublicKey } = authentication;

  const verify = async (publicKey, done) => {
    const result = await verifyPublicKey(publicKey);

    if (result.isLeft()) return done(result.left());
    if (result.right().isNone()) return done(null, false);

    return done(null, result.right().some());
  };

  const apiKeyStrategy = new HeaderAPIKeyStrategy(
    { header: 'Authorization', prefix: 'Api-Key ' },
    false,
    verify,
  );

  passport.use(apiKeyStrategy);
  app.use(passport.authenticate('headerapikey', { session: false }));
};

export default constructUseAuthentication;
