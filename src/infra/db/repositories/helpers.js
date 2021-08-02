import { Right, Left } from 'monet';

export const single = (toEntity) => ({ rows, rowCount }) => {
  if (rowCount === 0) return Left('Query did not return any rows.');
  if (rowCount > 1) return Left('Query returned too many rows.');

  return Right(toEntity(rows[0]));
};

export const many = (toEntity) => ({ rows }) => Right(rows.map(toEntity));
