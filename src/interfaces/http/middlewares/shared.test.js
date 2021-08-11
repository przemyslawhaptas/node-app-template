import bodyParser from 'body-parser';
import helmet from 'helmet';

import useShared from './shared';

jest.mock('helmet');
jest.mock('body-parser', () => ({ json: jest.fn() }));

describe('useShared', () => {
  it('uses helmet and bodyParser.json middlewares', () => {
    const app = { use: jest.fn() };
    const helmetMock = {};
    const bodyParserJsonMock = {};
    helmet.mockImplementation(() => helmetMock);
    bodyParser.json.mockImplementation(() => bodyParserJsonMock);

    useShared(app);

    expect(app.use.mock.calls).toEqual([
      [helmetMock],
      [bodyParserJsonMock],
    ]);
  });
});
