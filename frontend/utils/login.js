function login(payload) {
  payload && payload.access && localStorage.setItem('jwt', payload.access);
  payload && payload.refresh && localStorage.setItem('jwt-refresh', payload.refresh);
}

export default login;
