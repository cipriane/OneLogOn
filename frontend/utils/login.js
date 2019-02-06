function login(payload) {
  payload && payload.access ? localStorage.setItem('jwt', payload.access) : null;
}

export default login;
