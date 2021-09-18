import { single, maybeSingle, many } from './helpers';

describe('single', () => {
  const foo = (a) => a;
  const toEntity = (row) => ({ ...row, foo });

  describe('when no rows are returned', () => {
    const rows = [];
    const queryResult = { rows, rowCount: rows.length };

    it('returns an error', () => {
      const result = single(toEntity)(queryResult);

      expect(result.left()).toEqual('Query did not return any rows.');
    });
  });

  describe('when more than 1 row is returned', () => {
    const rows = [{}, {}];
    const queryResult = { rows, rowCount: rows.length };

    it('returns an error', () => {
      const result = single(toEntity)(queryResult);

      expect(result.left()).toEqual('Query returned too many rows.');
    });
  });

  describe('when a single row is returned', () => {
    const row = {};
    const rows = [row];
    const queryResult = { rows, rowCount: rows.length };

    it('applies an entity constructor to it and returns it', () => {
      const result = single(toEntity)(queryResult);
      const expected = { ...row, foo };

      expect(result.right()).toStrictEqual(expected);
    });
  });
});

describe('maybeSingle', () => {
  const foo = (a) => a;
  const toEntity = (row) => ({ ...row, foo });

  describe('when no rows are returned', () => {
    const rows = [];
    const queryResult = { rows, rowCount: rows.length };

    it('returns a None', () => {
      const result = maybeSingle(toEntity)(queryResult);

      expect(result.right().isNone()).toEqual(true);
    });
  });

  describe('when more than 1 row are returned', () => {
    const rows = [{}, {}];
    const queryResult = { rows, rowCount: rows.length };

    it('returns an error', () => {
      const result = maybeSingle(toEntity)(queryResult);

      expect(result.left()).toEqual('Query returned too many rows.');
    });
  });

  describe('when a single row is returned', () => {
    const row = {};
    const rows = [row];
    const queryResult = { rows, rowCount: rows.length };

    it('applies an entity constructor to it and returns it wrapped in Just', () => {
      const result = maybeSingle(toEntity)(queryResult);
      const expected = { ...row, foo };

      expect(result.right().just()).toStrictEqual(expected);
    });
  });
});

describe('many', () => {
  const foo = (a) => a;
  const toEntity = (row) => ({ ...row, foo });

  describe('when no rows are returned', () => {
    const rows = [];
    const queryResult = { rows, rowCount: rows.length };

    it('returns an empty array', () => {
      const result = many(toEntity)(queryResult);

      expect(result.right()).toEqual([]);
    });
  });

  describe('when more than 1 row is returned', () => {
    const row1 = {};
    const row2 = {};
    const rows = [row1, row2];
    const queryResult = { rows, rowCount: rows.length };

    it('maps the rows to an entity constructor', () => {
      const result = many(toEntity)(queryResult);
      const expected = [{ ...row1, foo }, { ...row2, foo }];

      expect(result.right()).toStrictEqual(expected);
    });
  });

  describe('when a single row is returned', () => {
    const row = {};
    const rows = [row];
    const queryResult = { rows, rowCount: rows.length };

    it('maps the rows to an entity constructor', () => {
      const result = many(toEntity)(queryResult);
      const expected = [{ ...row, foo }];

      expect(result.right()).toStrictEqual(expected);
    });
  });
});
