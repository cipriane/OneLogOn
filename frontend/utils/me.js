import jwt_decode from 'jwt-decode';
import isValidJWT from 'utils/isValidJWT';
import { Roles } from './constants';

function me(jwt) {
  if (!jwt || !isValidJWT(jwt)) {
    return {};
  }
  try {
    const decodedJwt = jwt_decode(jwt);
    // console.log(decodedJwt);

    return {
      id: decodedJwt.user_id,
      role: decodedJwt.is_staff ? Roles.staff : Roles.admin,
      username: decodedJwt.name,
      is_staff: decodedJwt.is_staff,
      is_kiosk_mode: decodedJwt.is_kiosk_mode,
    };
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default me;
