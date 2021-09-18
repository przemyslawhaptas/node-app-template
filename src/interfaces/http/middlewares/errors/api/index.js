const ERROR_DEFAULT = 'An unexpected error occurred.';
const ERROR_404 = 'Not found.';

const errorMessage = (error) => `${ERROR_DEFAULT}\n${error}\n${error.stack || ''}`;

const constructUseApiErrorHandler = ({ config }) => (app) => {
  const { nodeEnv } = config;

  app.use((err, req, res, _next) => {
    const statusCode = err.status || 500;
    const body = ['development', 'test'].includes(nodeEnv)
      ? errorMessage(err)
      : ERROR_DEFAULT;

    res.status(statusCode).json(body);
  });

  app.use((req, res, _next) => {
    res.status(404).json(ERROR_404);
  });
};

export default constructUseApiErrorHandler;
