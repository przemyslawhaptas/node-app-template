import fs from 'fs';
import morgan from 'morgan';

import constructLogger from './index';

jest.mock('fs');
jest.mock('morgan');

describe('constructLogger', () => {
  const config = { nodeEnv: 'test' };

  it('creates a write stream for logging to file and returns console and file loggers', () => {
    const stream = {};
    const consoleLogger = {};
    const fileLogger = {};
    fs.createWriteStream.mockImplementation((_path, _options) => stream);
    morgan
      .mockImplementationOnce((_mode) => consoleLogger)
      .mockImplementationOnce((_mode, _options) => fileLogger);

    const result = constructLogger({ config });

    expect(fs.createWriteStream.mock.calls).toEqual([
      ['log/test.log', { flags: 'a' }],
    ]);
    expect(morgan.mock.calls).toEqual([
      ['dev'],
      ['combined', { stream }],
    ]);
    expect(result).toStrictEqual({ console: consoleLogger, file: fileLogger });
  });
});
