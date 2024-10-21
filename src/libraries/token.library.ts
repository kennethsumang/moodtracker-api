import UnauthorizedError from '../exceptions/unauthorized.error';

/**
 * Extracts JWT token in bearer token string
 * @param   {unknown} bearerToken
 * @returns {string}
 */
const getJwtToken = (bearerToken: unknown) => {
  if (typeof bearerToken !== 'string') {
    throw new UnauthorizedError('Invalid token in header.');
  }

  const tokenSplit = bearerToken.split(' ');
  if (tokenSplit.length !== 2) {
    throw new UnauthorizedError('Invalid token format.');
  }

  return tokenSplit[1];
};

export { getJwtToken };
