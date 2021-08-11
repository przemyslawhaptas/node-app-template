import fs from 'fs';
import morgan from 'morgan';

import constructUseLogging from './index';

jest.mock('fs');
jest.mock('morgan');

describe('useLogging', () => {
  const app = { use: jest.fn() };
  const stream = {};
  const consoleLogger = {};
  const fileLogger = {};
  fs.createWriteStream
    .mockImplementation((_path, _options) => stream);

  describe('test env', () => {
    const config = { nodeEnv: 'test' };
    const useLogging = constructUseLogging({ config });

    morgan
      .mockImplementationOnce((_mode, _options) => fileLogger);

    it('creates a write stream for logging to file and uses a file logger', () => {
      useLogging(app);

      expect(fs.createWriteStream.mock.calls).toEqual([
        ['log/test.log', { flags: 'a' }],
      ]);
      expect(morgan.mock.calls).toEqual([
        ['combined', { stream }],
      ]);
      expect(app.use.mock.calls).toEqual([
        [fileLogger],
      ]);
    });
  });

  describe('development env', () => {
    const config = { nodeEnv: 'development' };
    const useLogging = constructUseLogging({ config });

    morgan
      .mockImplementationOnce((_mode, _options) => fileLogger)
      .mockImplementationOnce((_mode) => consoleLogger);

    it('creates a write stream for logging to file and uses console and file loggers', () => {
      useLogging(app);

      expect(fs.createWriteStream.mock.calls).toEqual([
        ['log/development.log', { flags: 'a' }],
      ]);
      expect(morgan.mock.calls).toEqual([
        ['combined', { stream }],
        ['dev'],
      ]);
      expect(app.use.mock.calls).toEqual([
        [fileLogger],
        [consoleLogger],
      ]);
    });
  });
});
