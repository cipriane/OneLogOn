function logout() {
  localStorage.removeItem('jwt');
}

export default logout;
