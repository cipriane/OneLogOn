function logout() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('jwt-refresh');
}

export default logout;
