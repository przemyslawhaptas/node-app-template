import constructUseApiErrorHandler from './index';

describe('useApiErrorHandler', () => {
  const config = { nodeEnv: 'test' };
  const useApiErrorHandler = constructUseApiErrorHandler({ config });

  it('uses an unxpected error handling and a 404 error handling middlewares', () => {
    const app = { use: jest.fn() };

    useApiErrorHandler(app);

    const middlewares = app.use.mock.calls;
    expect(middlewares).toHaveLength(2);
    expect(middlewares[0][0]).toHaveLength(4); // Error handler
    expect(middlewares[1][0]).toHaveLength(3); // 404 is not quite considered an error
  });
});
