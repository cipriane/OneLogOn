export const INCREASE = 'INCREASE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function increaseCount() {
  return {
    type: INCREASE,
  };
}

export function login(data) {
  return {
    type: LOGIN,
    payload: (data && data.access) || '',
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
