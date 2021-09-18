import bcrypt from 'bcrypt';

import { hash, compare } from './index';

jest.mock('bcrypt');

describe('hash', () => {
  it('uses bcrypt with 10 salt rounds', () => {
    const key = 'key';

    hash(key);

    expect(bcrypt.hash.mock.calls).toEqual([[key, 10]]);
  });
});

describe('compare', () => {
  it('uses bcrypt', () => {
    const key = 'key';
    const hashedKey = 'hashedKey';

    compare(key, hashedKey);

    expect(bcrypt.compare.mock.calls).toEqual([[key, hashedKey]]);
  });
});
