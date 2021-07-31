import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hash = (key) => bcrypt.hash(key, SALT_ROUNDS);

export const { compare } = bcrypt;
