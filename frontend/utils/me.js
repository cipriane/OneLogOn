import jwt_decode from 'jwt-decode';
import isValidJWT from 'utils/isValidJWT';

function me(jwt) {
  if (!jwt || !isValidJWT(jwt)) {
    return {};
  }
  try {
    const decodedJwt = jwt_decode(jwt);
    // console.log(decodedJwt);

    // TODO: change to real values
    return {
      id: decodedJwt.user_id,
      role: 'admin',
      name: decodedJwt.name,
      is_staff: decodedJwt.is_staff,
    };
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default me;
