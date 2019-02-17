import jwt_decode from 'jwt-decode';

function isValidJWT(jwt) {
  try {
    const decodedJwt = jwt_decode(jwt);
    return decodedJwt.exp > new Date().getTime() / 1000;
  } catch (err) {
    return false;
  }
}

export default isValidJWT;
