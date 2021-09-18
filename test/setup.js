process.on('unhandledRejection', (err) => {
  throw (err); // eslint-disable-line fp/no-throw
});
